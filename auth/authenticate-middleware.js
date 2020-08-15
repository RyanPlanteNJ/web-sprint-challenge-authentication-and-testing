const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets.js');

module.exports = {
    restricted,
    generateToken,
    isValid
}

function restricted (req,res,next) {
try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Your credentials are wrong" });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(400).json({ message: "No credentials provided" });
    }
} catch (error) {
    res.status(401).json({error: error.message})
}
}

function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === 'string');
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role || 'user',
    };

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, jwtSecret, options);

}
