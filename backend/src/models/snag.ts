import mongoose, { Schema, model } from 'mongoose';

const prevsnagSchema = new Schema({
    rank: {
        type: String,
        required: true,
    },
    snag: {
        type: String,
        required: true,
    },
    rectification: {
        type: String,
        required: true,
    },
    metadata: {
        helicopter: {
            type: String,
            required: true,
        },
        raised_by: {
            type: String,
            required: true,
        },
        event: {
            type: String,
            required: true,
        },
        snag_date: {
            type: String,
            required: true,
        },
        rectified_on: {
            type: String,
            required: true,
        },
    },
    similarity_score: {
        type: String,
        required: true,
    },
});

const snagSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        query: {
            type: String,
            required: true,
        },
        helicopter_type: {
            type: String,
            required: false,
        },
        event_type: {
            type: String,
            required: false,
        },
        raised_by: {
            type: String,
            required: false,
        },
        isChecked: {
            type: Boolean,
            required: true,
        },
        flight_hours: {
            lower: {
                type: String,
                required: true,
            },
            upper: {
                type: String,
                required: true,
            },
        },
    },
    generated: {
        timestamp: {
            type: String,
            required: true,
        },
        rectification: {
            ai_recommendation: {
                type: String,
                required: true,
            },
            based_on_historical_cases: {
                type: String,
                required: true,
            },
        },
        similar_historical_snags: [prevsnagSchema],
        analytics: {
            total_similar_cases_found: {
                type: String,
                required: true,
            },
            average_similarity_percentage: {
                type: String,
                required: true,
            },
            highest_similarity_percentage: {
                type: String,
                required: true,
            },
            lowest_similarity_percentage: {
                type: String,
                required: true,
            },
            recommendation_reliability: {
                type: String,
                required: true,
            },
        },
    },
});

const Snag = model('Snag', snagSchema);

export default Snag;
