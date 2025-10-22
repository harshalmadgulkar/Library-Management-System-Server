import mongoose from "mongoose";

export const connectDB = () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			dbName: "library_management_system",
		})
		.then((res) => {
			console.log("Database connected successfully.");
		})
		.catch((err) => {
			console.log("Error connecting to database", err);
		});
};
