import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Import backend routes

const userRoutes = require('../backend/routes/user');
const aboutRoutes = require('../backend/routes/about');
const signUpRoutes = require('../backend/routes/signUp');
const notificationsRoutes = require('../backend/routes/notifications');
const userUpdateRoutes = require('../backend/routes/userUpdate');
const contactRoutes = require('../backend/routes/contact');




const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();

// Environment variables
const PORT = process.env['PORT'] || 4000;

// CORS Configuration
app.use(
  cors({
    origin: [
      'https://training-website.onrender.com',
      'http://localhost:10000',
      'http://localhost:4000',
    ],
    methods: 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect("mongodb+srv://admin:12345@cluster0.lut4d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));


// Middleware to log request origins and methods
app.use((req, res, next) => {
  console.log('Request origin:', req.headers.origin);
  console.log('Request method:', req.method);
  next();
});

// Parse JSON request bodies
app.use(bodyParser.json());

// Serve backend API routes
app.use('/api', contactRoutes);
app.use('/api', userRoutes);
app.use('/api', aboutRoutes);
app.use('/api', signUpRoutes);
app.use('/api', notificationsRoutes);
app.use('/api', userUpdateRoutes);

// Serve static files from /browser for the Angular app
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

// Handle all other requests by rendering the Angular application
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

// Start the server if this module is the main entry point
if (isMainModule(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });
}

// The request handler used by the Angular CLI (dev-server and during build)
export const reqHandler = createNodeRequestHandler(app);
