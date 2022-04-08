'use strict';

const mongoose = require('mongoose');

const IncSchema = mongoose.Schema({
    schema: {
        type: String,
        id: true,
        unique: true,
    },
    seq: {
        type: Number,
        default: 0
    }
});

const Increment = mongoose.model("Increment", IncSchema);
module.exports = Increment;
