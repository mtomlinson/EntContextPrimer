"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_BASE_URL = void 0;
const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3001;
exports.API_BASE_URL = `http://${HOST}:${PORT}/api`;
