const Users = require('../models/user.model');
const { successResponse, errorResponse } = require('../utils/response');
const { generateToken, verifyToken } = require('../utils/token');
const bcrypt = require('bcrypt');
const { TOKEN_TYPE } = require('../constants/token');

const login = async (data) => {
    const { email, password } = data;
    
    const user = await Users.findOne({
        email,
    });

    if (!user) {
        return errorResponse(400, 'Email is not registered');
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
        return errorResponse(400, 'Password or email is incorrect');
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

    if(!refreshToken) {
        return errorResponse(400, 'Refresh token is required');
    }

    const decoded = verifyToken(refreshToken, TOKEN_TYPE.REFRESH);

    const accessToken = generateToken(decoded.id, TOKEN_TYPE.ACCESS);
    const newRefreshToken = generateToken(decoded.id, TOKEN_TYPE.REFRESH);

    return successResponse('Renew token success', {
        tokens: {
            accessToken,
            refreshToken: newRefreshToken,
        }
    });
}

module.exports = {
    login,
    renewToken
}