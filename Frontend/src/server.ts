import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { environment } from './environments/environment';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const cors = require('cors');
const app = express();
const angularApp = new AngularNodeAppEngine();

// CORS Configuration
app.use(cors({
  origin: 'https://training-website.onrender.com',
  methods: 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Proxy requests to the backend API server
app.use('/api', createProxyMiddleware({
  target: 'https://training-website-6-0-backend.onrender.com',
  changeOrigin: true,
  secure: false,
}));

// Serve static files from /browser
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

// Handle all other requests by rendering the Angular application
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

// Start the server if this module is the main entry point
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// The request handler used by the Angular CLI (dev-server and during build)
export const reqHandler = createNodeRequestHandler(app);
