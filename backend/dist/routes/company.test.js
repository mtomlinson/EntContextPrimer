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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const connection_1 = __importDefault(require("../db/connection"));
describe('/api/company', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, connection_1.default)('company_context').truncate();
        yield (0, connection_1.default)('team_context').truncate();
        yield (0, connection_1.default)('individual_context').truncate();
        yield (0, connection_1.default)('users').truncate();
        yield (0, connection_1.default)('teams').truncate();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection_1.default.destroy();
    }));
    it('should return 404 when no company context is set', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/api/company');
        expect(res.status).toBe(404);
    }));
    it('should create a new company context', () => __awaiter(void 0, void 0, void 0, function* () {
        const context = { name: 'Test Company', domain: 'test.com' };
        const res = yield (0, supertest_1.default)(index_1.default)
            .put('/api/company')
            .send({ context });
        expect(res.status).toBe(200);
        expect(res.body.context).toEqual(JSON.stringify(context));
    }));
    it('should fetch the company context', () => __awaiter(void 0, void 0, void 0, function* () {
        const context = { name: 'Test Company', domain: 'test.com' };
        yield (0, supertest_1.default)(index_1.default)
            .put('/api/company')
            .send({ context });
        const res = yield (0, supertest_1.default)(index_1.default).get('/api/company');
        expect(res.status).toBe(200);
        expect(res.body.context).toEqual(JSON.stringify(context));
    }));
});
