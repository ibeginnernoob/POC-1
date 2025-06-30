import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
	pb_number: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },	
	name: {
        type: String,
        required: true,
    },
	gender: {
        type: String,
        required: false,
    },
	phone: {
        type: String,
        required: false,
    },
	role: {
        type: String,
        required: false,
    }, 
	division: {
        type: String,
        required: false,
    },
	department: {
        type: String,
        required: false,
    },
	designation: {
        type: String,
        required: false,
    },
    snags: [
        {
            type: String,
            ref: 'Chat',
			default: []
        },
    ],
});

const User = model('User', userSchema);

export default User;