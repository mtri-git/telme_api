const jwt = require("jsonwebtoken");
const { TOKEN_TYPE } = require("../constants/token");

/*
 *    Generate token
 *    @param {string} userId
 *    @param {string} type: 'access' | 'refresh'
 *    @return {string}
 */
const generateToken = (userId, type) => {
    const payload = {
        id: userId,
    };

    const secret = type === TOKEN_TYPE.ACCESS ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    const expiresIn = type === TOKEN_TYPE.ACCESS ? process.env.ACCESS_TOKEN_EXPIRES_IN : process.env.REFRESH_TOKEN_EXPIRES_IN;
    
    return jwt.sign(payload, secret, {
        expiresIn
    });
};

const verifyToken = (token, type) => {
    const secret = type === TOKEN_TYPE.ACCESS ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    return jwt.verify(token, secret);
};

module.exports = {
    generateToken,
    verifyToken
};