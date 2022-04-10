'use strict';

const Comment = require("./comment.model");
const IncrementService = require("../_inc/increment.service");
const rowDateFormat = require("../_util/date-formatter.util");

class CommentService {
    static async getComments(dto) {
        const { articleID } = dto;
        const rows = await Comment
            .find({ articleID, isDeleted: false })
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        return rows.map(row => rowDateFormat(row));
    };

    static async createComment(user, dto) {
        const author = user._id;
        const { articleID, text } = dto;

        if (!text) throw Error('댓글 내용을 입력하세요.');

        const commentID = await IncrementService.commentSequence();
        const doc = { commentID, text, articleID, author };
        const comment = new Comment(doc);
        await comment.save();

        const row = await Comment.findOne({ articleID })
            .populate('author', 'name email');;

        return rowDateFormat(row);
    };

    static async updateComment(dto) {
        const { article, commentID, text } = dto;

        if (!text) throw Error('댓글 내용을 입력하세요.');

        const doc = { text, article };
        const row = await Comment.findOneAndUpdate(
            { article, commentID }, { $set: doc }, { new: true }
        );

        if (!row) throw Error('존재하지 않는 댓글입니다.');

        return rowDateFormat(row);
    };

    static async deleteComment(dto) {
        const { article, commentID } = dto;

        const row = await Comment.findOneAndUpdate(
            { article, commentID }, { $set: { isDeleted: true } }
        );

        if (!row) throw Error('존재하지 않는 댓글입니다.');
        if (row.isDeleted) throw Error('이미 삭제된 댓글입니다.');

        return true;
    }
};

module.exports = CommentService;
