"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceSchema = void 0;
var mongoose_1 = require("mongoose");
exports.deviceSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId },
    osType: { type: String, required: true },
    osName: { type: String, required: true },
    urlId: { type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Url', required: true },
    deviceType: { type: String, required: true },
    deviceName: { type: String, required: true },
    geolocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    userIp: { type: String },
    createdAt: { type: Date, default: Date.now },
});
