const Users = require('../models/user.model');
const { successResponse } = require('../utils/response');
const { generateToken } = require('../utils/token');
const bcrypt = require('bcrypt');

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

    const accessToken = generateToken(user._id, 'access');
    const refreshToken = generateToken(user._id, 'refresh');

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

module.exports = {
    login
}