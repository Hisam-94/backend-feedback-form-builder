const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Star Rating, Smile Rating, Text Area, etc.
    label: { type: String, required: true },
    required: { type: Boolean, default: false },
    errorMessage: { type: String },
    options: [{ type: String }], // for Radio Buttons, Categories, etc.
});

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fields: [
        {
            type: { type: String, required: true },
            label: { type: String, required: true },
            required: { type: Boolean, default: false },
            errorMessage: { type: String, default: '' },
            options: {
                type: Map,
                of: String,  // Assuming options are key-value pairs
            },
        },
    ],
    logic: { type: Object }, // To store logic like page-specific or timed display logic
    createdAt: { type: Date, default: Date.now },
    submissions: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
});

module.exports = mongoose.model('Form', formSchema);
