import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: false,
			select: false,
		},
		role: {
			type: String,
			enum: ['Admin', 'User'],
			default: 'User',
		},
		accountVerified: { type: Boolean, default: false },
		borrowedBooks: [
			{
				bookId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Borrow',
				},
				returned: {
					type: Boolean,
					default: false,
				},
				bookTitle: String,
				boorrowedDate: Date,
				dueDate: Date,
			},
		],
		avatar: {
			public_id: String,
			url: String,
		},
		varificationCode: Number,
		verificationCodeExpire: Date,
		resetPassword: String,
		resetPasswordExpire: Date,
	},
	{
		timestamps: true,
	}
);

export const User = mongoose.model('User', userSchema);
