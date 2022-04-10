'use strict';

const Article = require("./article.model");
const IncrementService = require("../_inc/increment.service");
const rowDateFormat = require("../_util/date-formatter.util");

class ArticleService {
    static async getArticles() {
        const rows = await Article
            .find({ isDeleted: false })
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        return rows.map(row => rowDateFormat(row));
    };

    static async getArticle(dto) {
        const { articleID } = dto;
        const row = await Article.findOne({ articleID })
            .populate('author', 'name email');

        if (!row) throw Error('존재하지 않는 게시글입니다.');
        if (row.isDeleted) throw Error('삭제된 게시글입니다.');

        return rowDateFormat(row);
    };

    static async createArticle(user, dto) {
        const author = user._id;
        const { title, content } = dto;

        if (!title) throw Error('제목을 입력하세요.');
        if (!content) throw Error('내용을 입력하세요.');

        const articleID = await IncrementService.articleSequence();
        const doc = { articleID, title, content, author };
        const article = new Article(doc);
        await article.save();

        const row = await Article.findOne({ articleID, author })
            .populate('author', 'name email');
        return rowDateFormat(row);
    };

    static async updateArticle(dto) {
        const { articleID, title, content } = dto;

        if (!title) throw Error('제목을 입력하세요.');
        if (!content) throw Error('내용을 입력하세요.');

        const doc = { title, content };
        const row = await Article.findOneAndUpdate(
            { articleID }, { $set: doc }, { new: true }
        ).populate('author', 'name email');

        if (!row) throw Error('존재하지 않는 게시글입니다.');

        return rowDateFormat(row);
    };

    static async deleteArticle(dto) {
        const { articleID } = dto;

        const row = await Article.findOneAndUpdate(
            { articleID }, { $set: { isDeleted: true } }
        );

        if (!row) throw Error('존재하지 않는 게시글입니다.');
        if (row.isDeleted) throw Error('이미 삭제된 게시글입니다.');

        return true;
    };
};

module.exports = ArticleService;