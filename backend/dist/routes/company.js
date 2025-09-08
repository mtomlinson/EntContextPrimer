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
const express_1 = require("express");
const connection_1 = __importDefault(require("../db/connection"));
const router = (0, express_1.Router)();
// GET the company context
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // There should only be one company context, so we fetch the first one.
        const companyContext = yield (0, connection_1.default)('company_context').first();
        if (companyContext) {
            res.json(companyContext);
        }
        else {
            // If no context is set yet, return a default or an empty object.
            res.status(404).json({ message: 'Company context not set.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching company context', error });
    }
}));
// PUT (create or update) the company context
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { context } = req.body;
    if (!context) {
        return res.status(400).json({ message: 'Context data is required.' });
    }
    try {
        const existingContext = yield (0, connection_1.default)('company_context').first();
        if (existingContext) {
            // Update existing context
            yield (0, connection_1.default)('company_context').where({ id: existingContext.id }).update({
                context: JSON.stringify(context), // Store context as a JSON string
                updated_at: new Date()
            });
        }
        else {
            // Insert new context
            yield (0, connection_1.default)('company_context').insert({
                context: JSON.stringify(context)
            });
        }
        const updatedContext = yield (0, connection_1.default)('company_context').first();
        res.status(200).json(updatedContext);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating company context', error });
    }
}));
exports.default = router;
