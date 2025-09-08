"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_js_1 = __importDefault(require("../../knexfile.js"));
// We are using the development configuration for now
const db = (0, knex_1.default)(knexfile_js_1.default.development);
exports.default = db;
