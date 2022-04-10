'use strict';

const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    commentID: {
        type: Number,
        index: true,
        unique: true
    },
    text: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    articleID: {
        type: Number
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });


const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
