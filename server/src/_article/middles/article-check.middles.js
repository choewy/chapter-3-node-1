const ArticleService = require("../article.service");

const articleCheck = async (req, res, next) => {
    const dto = req.params;
    try {
        await ArticleService.getArticle(dto);
        next();
    } catch (error) {
        const { message } = error;
        return res.json({ ok: false, error: message });
    };
};

module.exports = articleCheck;