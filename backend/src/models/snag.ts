import { Schema, model } from 'mongoose';

const snagSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
});

const Snag = model('Snag', snagSchema);

export default Snag;
