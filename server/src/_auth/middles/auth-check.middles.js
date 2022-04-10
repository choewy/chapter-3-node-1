const AuthService = require("../auth.service");

const cookieKeys = {
    token: process.env.COOKIE_TOKEN_KEY,
    tokenExp: process.env.COOKIE_TOKEN_EXP_KEY
};

const authCheck = async (req, res, next) => {
    try {
        const token = req.cookies[cookieKeys.token];
        const user = await AuthService.findUserByToken(token);
        if (!user) return res.json({ auth: false, error: "로그인 페이지로 이동합니다." });
        req.token = token;
        req.user = user;
    } catch (err) {
        return res.json({ auth: false, error: err });
    };

    next();
};

module.exports = authCheck;