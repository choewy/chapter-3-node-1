'use strict';

const { Router } = require("express");
const authCheck = require("../_auth/middles/auth-check.middles");
const ArticleService = require("./article.service");

const router = Router();

router.get('/', async (_, res) => {
    try {
        const articles = await ArticleService.getArticles();
        return res.json({ ok: true, articles })
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
});

router.get('/:articleID', async (req, res) => {
    const dto = req.params;
    try {
        const article = await ArticleService.getArticle(dto);
        return res.json({ ok: true, article });
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
});

router.post('/', authCheck, async (req, res) => {
    const user = req.user;
    const dto = req.body;
    try {
        const article = await ArticleService.createArticle(user, dto);
        return res.json({ ok: true, article });

    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
});

router.patch('/:articleID', async (req, res) => {
    const dto = { ...req.params, ...req.body };
    try {
        const article = await ArticleService.updateArticle(dto);
        return res.json({ ok: true, article });
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
});

router.delete('/:articleID', async (req, res) => {
    const dto = req.params;
    try {
        await ArticleService.deleteArticle(dto);
        return res.json({ ok: true });
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
});

module.exports = router;