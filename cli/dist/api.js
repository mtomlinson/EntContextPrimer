"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndividualContext = exports.getUser = exports.getUsers = exports.getTeamContext = exports.getTeams = exports.getCompanyContext = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const getCompanyContext = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${config_1.API_BASE_URL}/company`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching company context:', error.message);
        throw error;
    }
});
exports.getCompanyContext = getCompanyContext;
const getTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${config_1.API_BASE_URL}/teams`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching teams:', error.message);
        throw error;
    }
});
exports.getTeams = getTeams;
const getTeamContext = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${config_1.API_BASE_URL}/teams/${teamId}/context`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching team context for team ID ${teamId}:`, error.message);
        throw error;
    }
});
exports.getTeamContext = getTeamContext;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${config_1.API_BASE_URL}/users`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    }
});
exports.getUsers = getUsers;
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${config_1.API_BASE_URL}/users/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching user for user ID ${userId}:`, error.message);
        throw error;
    }
});
exports.getUser = getUser;
const getIndividualContext = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${config_1.API_BASE_URL}/users/${userId}/context`);
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching individual context for user ID ${userId}:`, error.message);
        throw error;
    }
});
exports.getIndividualContext = getIndividualContext;
