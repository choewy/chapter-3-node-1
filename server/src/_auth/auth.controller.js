'use strict';

const { Router } = require("express");
const authCheck = require("./middles/auth-check.middles");
const AuthService = require("./auth.service");

const cookieKeys = {
    token: process.env.COOKIE_TOKEN_KEY,
    tokenExp: process.env.COOKIE_TOKEN_EXP_KEY
};

const router = Router();

router.get('/', authCheck, async (req, res) => {
    const user = {
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        auth: true,
    };

    return res.json({ auth: true, user });
});

router.post('/signup', async (req, res) => {
    try {
        const { token, tokenExp } = await AuthService.signup(req.body);

        console.log(token);
        res.cookie(cookieKeys.token, token);
        res.cookie(cookieKeys.tokenExp, tokenExp);
        return res.json({ ok: true });
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { token, tokenExp } = await AuthService.signin(req.body);
        res.cookie(cookieKeys.token, token);
        res.cookie(cookieKeys.tokenExp, tokenExp);
        return res.json({ ok: true });
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
});

router.delete('/signout', authCheck, async (req, res) => {
    try {
        await AuthService.signout(req.user);
        return res.json({ ok: true });
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    }
});

module.exports = router;