import express from 'express';
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from '../src/routes/v1/routes';
import fs from 'fs';
import path from 'path'
import requestLoggerMiddleware from "./middlewares/requestLogger";


// Dynamically load swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf8'));

// ========================
// Initialize App Express
// ========================
const app = express();
//====== Api test ======
app.use(express.json());



// Apply the middleware globally
app.use(requestLoggerMiddleware);
// ========================
// Global Middleware
// ========================
app.use(express.json())  // Help to get the json from request body

// ========================
// Global API V1
// ========================
RegisterRoutes(app)

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// ERROR Handler
// ========================


export default app;