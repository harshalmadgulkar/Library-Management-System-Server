// Importing required packages and modules
import express from "express"; // Express is a minimal web framework for building APIs and web servers.
import { config } from "dotenv"; // dotenv is used to load environment variables from a .env file.
import cookieParser from "cookie-parser"; // cookie-parser helps parse cookies from the request headers.
import cors from "cors"; // cors enables Cross-Origin Resource Sharing to allow API access from a different domain.
import { connectDB } from "./databse/db.js"; // Function to connect to MongoDB (or another database).
import { errorMiddleware } from "./middlewares/errorMiddlewares.js"; // Custom error-handling middleware.
import authRouter from "./routes/authRouter.js"; // Router for authentication-related routes.
import bookRouter from "./routes/bookRouter.js"; // Router for book-related routes.

// Initialize Express application
export const app = express(); // Create an instance of an Express application.

// Load environment variables from config.env file
config({ path: "./config.env" });

// Enable Cross-Origin requests (CORS) with specific configuration
app.use(
	cors({
		origin: [process.env.FRONTEND_URL], // Only allow requests from this frontend URL
		methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
		credentials: true, // Allow cookies and credentials to be sent in cross-origin requests
	})
);

// Middleware to parse cookies from the request
app.use(cookieParser()); // ← Fixed: added parentheses to call the function

// Middleware to parse incoming JSON requests
app.use(express.json()); // Allows the app to accept JSON payloads

// Middleware to parse URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ extended: true })); // extended: true allows nested objects in query strings

// Mounting the authentication router on the /api/v1/auth path
app.use("/api/v1/auth", authRouter); // Routes for authentication (e.g., register, login)
app.use("/api/v1/book", bookRouter); // Routes for book management (e.g., add, delete, get books)

// Connect to the database
connectDB(); // Establish connection with the database before handling requests

// Error-handling middleware (should be added after all routes)
app.use(errorMiddleware); // Handles errors in a centralized way and sends proper responses
