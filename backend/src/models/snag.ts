import { Schema, model } from 'mongoose';

const snagSchema = new Schema({
    filename: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    query: {
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
    similar_historical_snags: Schema.Types.Mixed,
    isAnalysisFetch: {
        type: Boolean,
        default: false,
    },
    based_on_historical_cases: {
        type: String,
        default: 0,
    },
    analytics: {
        total_similar_cases_found: {
            type: String,
            default: 0,
        },
        average_similarity_percentage: {
            type: String,
            default: 0,
        },
        highest_similarity_percentage: {
            type: String,
            default: 0,
        },
        lowest_similarity_percentage: {
            type: String,
            default: 0,
        },
        recommendation_reliability: {
            type: String,
            default: 0,
        },
    },
    graphs: Schema.Types.Mixed,
});

const Snag = model('Snag', snagSchema);

export default Snag;
