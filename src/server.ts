import express, { type Application } from 'express';
import { type Server, createServer } from 'http';
import expressApp from './app';

export function initServer() {
  const app: Application = express();
  const server: Server = createServer(app);
  expressApp(app);

  return server;
}
