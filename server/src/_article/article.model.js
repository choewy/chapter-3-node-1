'use strict';

const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    articleID: {
        type: Number,
        index: true,
        unique: true
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    author: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
