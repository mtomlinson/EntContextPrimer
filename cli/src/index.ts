import { Command } from 'commander';
import {
  getCompanyContext,
  getTeamContext,
  getIndividualContext,
  getUser
} from './api';

const program = new Command();

program
  .name('ent-context-cli')
  .description('CLI to fetch and prime enterprise context for an LLM')
  .version('1.0.0');

program.command('prime <userId>')
  .description('Fetches and combines all context for a given user ID.')
  .action(async (userIdStr: string) => {
    const userId = parseInt(userIdStr, 10);
    if (isNaN(userId)) {
      console.error('Error: User ID must be a number.');
      process.exit(1);
    }

    console.log(`Priming context for User ID: ${userId}...\n`);
    const combinedContext: any = {};

    try {
      // 1. Get company context
      console.log('Fetching company context...');
      const companyContext = await getCompanyContext();
      combinedContext.company = companyContext?.context ? JSON.parse(companyContext.context) : null;

      // 2. Get user and their team ID
      console.log('Fetching user details...');
      const user = await getUser(userId);
      if (!user) {
        console.error(`Error: User with ID ${userId} not found.`);
        process.exit(1);
      }

      // 3. Get team context if user has a team
      if (user.team_id) {
        console.log(`Fetching team context for Team ID: ${user.team_id}...\n`);
        const teamContext = await getTeamContext(user.team_id);
        combinedContext.team = teamContext.map((tc: any) => tc.context ? JSON.parse(tc.context) : null);
      } else {
        console.log('User is not associated with a team.');
      }

      // 4. Get individual context
      console.log('Fetching individual context...');
      const individualContext = await getIndividualContext(userId);
      combinedContext.individual = individualContext.map((ic: any) => ic.context ? JSON.parse(ic.context) : null);

      // 5. Print the final combined context
      console.log('\n--- Combined Enterprise Context ---');
      console.log(JSON.stringify(combinedContext, null, 2));
      console.log('--- End of Context ---\n');

    } catch (error: any) {
      console.error('\nAn error occurred during the priming process:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
