'use strict';

/* express */
const express = require('express');
const app = express();

/* mongoose */
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const mongoDBName = process.env.MONGO_DB_NAME;
const IncrementService = require('../_inc/increment.service');

/* connect MongoDB & initialize Sequence */
(() => mongoose.connect(
    mongoURI,
    { dbName: mongoDBName },
    (error) => {
        if (error) return console.log('MongoDB Connection Error!');
        IncrementService.initArticleSequence();
        IncrementService.initCommentSequence();
    }
))();

/* middlewares */
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: true }));

/* routes */
const articleRouter = require('../_article/article.controller');
const commentRouter = require('../_comment/comment.controller');
app.use('/api/articles', articleRouter);
app.use('/api/comments', commentRouter);


module.exports = app;