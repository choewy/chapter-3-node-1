'use strict';

/* express */
const express = require('express');
const app = express();

/* mongoose */
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const mongoDBName = process.env.MONGO_DB_NAME;
const IncrementService = require('../_inc/increment.service');

/* connect mongoose & initialize sequence */
(() => mongoose.connect(
    mongoURI,
    { dbName: mongoDBName },
    (error) => {
        if (error) {
            console.log('MongoDB Connection Error!');
            console.log(error);
            return;
        };
        IncrementService.initArticleSequence();
        IncrementService.initCommentSequence();
        console.log('MongoDB Connection Success!');
    }
))();

/* middlewares */
const cors = require('cors');
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true }));

/* routes */
const authRouter = require('../_auth/auth.controller');
const articleRouter = require('../_article/article.controller');
const commentRouter = require('../_comment/comment.controller');

app.use('/api/auth', authRouter);
app.use('/api/articles', articleRouter);
app.use('/api/articles', commentRouter);

/* statics */
const path = require('path');
app.use(express.static('build'));
app.use('*', (_, res) => res.sendFile(path.resolve('build', 'index.html')));


module.exports = app;