import { User } from "../models/userModel.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddlewares.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		return next(
			new ErrorHandler(
				"User is not authenticated. Please login to access this resource.",
				400
			)
		);
	}
	// console.log(token);
	const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
	// console.log(decoded);
	req.user = await User.findById(decoded.id);
	next();
});
