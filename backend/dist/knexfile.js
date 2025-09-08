"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path_1.default.resolve(process.cwd(), 'backend', 'src', 'db', 'dev.sqlite3')
        },
        useNullAsDefault: true,
        migrations: {
            directory: path_1.default.resolve(process.cwd(), 'backend', 'src', 'db', 'migrations')
        },
        seeds: {
            directory: path_1.default.resolve(process.cwd(), 'backend', 'src', 'db', 'seeds')
        }
    },
    // production configuration can be added here later
};
exports.default = config;
