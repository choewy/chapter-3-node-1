'use strict';

const Article = require("./article.model");
const IncrementService = require("../_inc/increment.service");

class ArticleService {
    static async getArticles() {
        return await Article
            .find({ isDeleted: false })
            .sort({ createdAt: -1 });;
    };

    static async getArticle(dto) {
        const { articleID } = dto;
        const row = await Article.findOne({ articleID });

        if (!row) throw Error('존재하지 않는 게시글입니다.');
        if (row.isDeleted) throw Error('삭제된 게시글입니다.');

        return row;
    };

    static async createArticle(dto) {
        const { title, content, author } = dto;

        if (!title) throw Error('제목을 입력하세요.');
        if (!content) throw Error('내용을 입력하세요.');
        if (!author) throw Error('작성자를 입력하세요.');

        const articleID = await IncrementService.articleSequence();;
        const doc = { articleID, title, content, author };
        const row = await Article.create(doc);

        return row;
    };

    static async updateArticle(dto) {
        const { articleID, title, content, author } = dto;

        if (!title) throw Error('제목을 입력하세요.');
        if (!content) throw Error('내용을 입력하세요.');
        if (!author) throw Error('작성자를 입력하세요.');

        const doc = { title, content, author };
        const row = await Article.findOneAndUpdate(
            { articleID }, { $set: doc }, { new: true }
        );

        if (!row) throw Error('존재하지 않는 게시글입니다.');

        return row;
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