import mongoose, { Schema, model } from 'mongoose';

const snagSchema = new Schema({
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

const Snag = model('Snag', snagSchema);

export default Snag;