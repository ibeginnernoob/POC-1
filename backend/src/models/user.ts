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
        required: true,
    },
	phone: {
        type: String,
        required: true,
    },
	role: {
        type: String,
        required: true,
    }, 
	division: {
        type: String,
        required: true,
    },
	department: {
        type: String,
        required: true,
    },
	designation: {
        type: String,
        required: true,
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