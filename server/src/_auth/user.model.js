'use strict';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
    },
    password: {
        type: String
    },
    token: {
        type: String,
        default: ''
    },
    tokenExp: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);

module.exports = User;
