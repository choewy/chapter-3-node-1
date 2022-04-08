'use strict';

const { Router } = require("express");
const articleCheck = require("../_article/middles/article-check.middles");
const CommentService = require("./comment.service");
const router = Router();

router.get('/:articleID', articleCheck, async (req, res) => {
    const dto = req.params;
    try {
        const comments = await CommentService.getComments(dto);
        return res.json({ ok: true, comments })
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
});

router.post('/:articleID', articleCheck, async (req, res) => {
    const dto = { ...req.params, ...req.body };
    try {
        const comment = await CommentService.createComment(dto);
        return res.json({ ok: true, comment });
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
});

router.patch('/:articleID/:commentID', articleCheck, async (req, res) => {
    const dto = { ...req.params, ...req.body };
    try {
        const comment = await CommentService.updateComment(dto);
        return res.json({ ok: true, comment });
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
});

router.delete('/:articleID/:commentID', articleCheck, async (req, res) => {
    const dto = req.params;
    try {
        await CommentService.deleteComment(dto);
        return res.json({ ok: true });
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
});

module.exports = router;