'use strict';

const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    articleID: {
        type: Number,
        unique: true,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
