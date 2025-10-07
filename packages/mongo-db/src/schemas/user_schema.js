"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
var mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    refreshToken: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
