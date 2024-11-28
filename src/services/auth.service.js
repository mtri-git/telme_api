const Users = require('../models/user.model');
const { successResponse } = require('../utils/response');
const { generateToken, verifyToken } = require('../utils/token');
const bcrypt = require('bcrypt');
const { TOKEN_TYPE } = require('../constants/token');

const login = async (data) => {
    const { email, password } = data;
    
    const user = await Users.findOne({
        email,
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
        throw new Error('Password is incorrect');
    }

    const accessToken = generateToken(user._id, TOKEN_TYPE.ACCESS);
    const refreshToken = generateToken(user._id, TOKEN_TYPE.REFRESH);

    user.password = undefined;

    return successResponse('Login success', {   
            tokens: {
                accessToken,
                refreshToken,
            },
            user
        }
    );
}

const renewToken = async (data) => {
    const { refreshToken } = data;
    const decoded = verifyToken(refreshToken, TOKEN_TYPE.REFRESH);

    const accessToken = generateToken(decoded.userId, TOKEN_TYPE.ACCESS);
    const newRefreshToken = generateToken(decoded.userId, TOKEN_TYPE.REFRESH);

    return successResponse('Renew token success', {
        tokens: {
            accessToken,
            newRefreshToken,
        }
    });
}

module.exports = {
    login,
    renewToken
}