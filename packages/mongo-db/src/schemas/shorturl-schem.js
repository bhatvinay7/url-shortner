"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlSchema = void 0;
var mongoose_1 = require("mongoose");
exports.urlSchema = new mongoose_1.Schema({
    longUrl: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User', required: true },
    shortUrl: { type: String, required: true, unique: true },
    topic: { type: String, default: "", required: false },
    createdAt: { type: Date, default: Date.now },
});
