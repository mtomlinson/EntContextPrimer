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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const api_1 = require("./api");
const program = new commander_1.Command();
program
    .name('ent-context-cli')
    .description('CLI to fetch and prime enterprise context for an LLM')
    .version('1.0.0');
program.command('prime <userId>')
    .description('Fetches and combines all context for a given user ID.')
    .action((userIdStr) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(userIdStr, 10);
    if (isNaN(userId)) {
        console.error('Error: User ID must be a number.');
        process.exit(1);
    }
    console.log(`Priming context for User ID: ${userId}...\n`);
    const combinedContext = {};
    try {
        // 1. Get company context
        console.log('Fetching company context...');
        const companyContext = yield (0, api_1.getCompanyContext)();
        combinedContext.company = (companyContext === null || companyContext === void 0 ? void 0 : companyContext.context) ? JSON.parse(companyContext.context) : null;
        // 2. Get user and their team ID
        console.log('Fetching user details...');
        const user = yield (0, api_1.getUser)(userId);
        if (!user) {
            console.error(`Error: User with ID ${userId} not found.`);
            process.exit(1);
        }
        // 3. Get team context if user has a team
        if (user.team_id) {
            console.log(`Fetching team context for Team ID: ${user.team_id}...\n`);
            const teamContext = yield (0, api_1.getTeamContext)(user.team_id);
            combinedContext.team = teamContext.map((tc) => tc.context ? JSON.parse(tc.context) : null);
        }
        else {
            console.log('User is not associated with a team.');
        }
        // 4. Get individual context
        console.log('Fetching individual context...');
        const individualContext = yield (0, api_1.getIndividualContext)(userId);
        combinedContext.individual = individualContext.map((ic) => ic.context ? JSON.parse(ic.context) : null);
        // 5. Print the final combined context
        console.log('\n--- Combined Enterprise Context ---');
        console.log(JSON.stringify(combinedContext, null, 2));
        console.log('--- End of Context ---\n');
    }
    catch (error) {
        console.error('\nAn error occurred during the priming process:', error.message);
        process.exit(1);
    }
}));
program.parse(process.argv);
