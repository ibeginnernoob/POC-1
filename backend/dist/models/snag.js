"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const snagSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        description: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
        },
        event: {
            type: String,
            required: false
        },
        raisedBy: {
            type: String,
            required: false
        }
    },
});
const Snag = (0, mongoose_1.model)('Snag', snagSchema);
exports.default = Snag;
