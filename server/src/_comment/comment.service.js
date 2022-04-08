'use strict';

const Comment = require("./comment.model");
const IncrementService = require("../_inc/increment.service");
const rowDateFormat = require("../_util/date-formatter.util");

class CommentService {
    static async getComments(dto) {
        const { articleID } = dto;
        const rows = await Comment
            .find({ articleID, isDeleted: false })
            .sort({ createdAt: -1 });

        return rows.map(row => rowDateFormat(row));
    };

    static async createComment(dto) {
        const { articleID, text, author } = dto;

        if (!text) throw Error('댓글 내용을 입력하세요.');
        if (!author) throw Error('작성자를 입력하세요.');

        const commentID = await IncrementService.commentSequence();
        const doc = { commentID, text, author, articleID };
        const row = await Comment.create(doc);

        return rowDateFormat(row);
    };

    static async updateComment(dto) {
        const { articleID, commentID, text, author } = dto;

        if (!text) throw Error('댓글 내용을 입력하세요.');
        if (!author) throw Error('작성자를 입력하세요.');

        const doc = { text, author, articleID };
        const row = await Comment.findOneAndUpdate(
            { articleID, commentID }, { $set: doc }, { new: true }
        );

        if (!row) throw Error('존재하지 않는 댓글입니다.');

        return rowDateFormat(row);
    };

    static async deleteComment(dto) {
        const { articleID, commentID } = dto;

        const row = await Comment.findOneAndUpdate(
            { articleID, commentID }, { $set: { isDeleted: true } }
        );

        if (!row) throw Error('존재하지 않는 댓글입니다.');
        if (row.isDeleted) throw Error('이미 삭제된 댓글입니다.');

        return true;
    }
};

module.exports = CommentService;
