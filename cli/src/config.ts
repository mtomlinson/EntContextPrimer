const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3001;

export const API_BASE_URL = `http://${HOST}:${PORT}/api`;
