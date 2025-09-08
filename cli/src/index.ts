import { Command } from 'commander';
import axios from 'axios';

const program = new Command();

program
  .name('ent-context-cli')
  .description('CLI to manage Enterprise Context')
  .version('1.0.0');

program.command('get-company-context')
  .description('Fetches the company context')
  .action(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/company');
      console.log('Company Context:', response.data);
    } catch (error: any) {
      console.error('Error fetching company context:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
  });

program.command('get-team-context <teamId>')
  .description('Fetches the context for a specific team')
  .action(async (teamId: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/teams/${teamId}/context`);
      console.log(`Team Context for Team ID ${teamId}:`, response.data);
    } catch (error: any) {
      console.error(`Error fetching team context for Team ID ${teamId}:`, error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
  });

program.command('get-individual-context <userId>')
  .description('Fetches the context for a specific user')
  .action(async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/users/${userId}/context`);
      console.log(`Individual Context for User ID ${userId}:`, response.data);
    } catch (error: any) {
      console.error(`Error fetching individual context for User ID ${userId}:`, error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
  });

program.command('get-all-context')
  .description('Fetches all available context (company, team, individual)')
  .option('-t, --teamId <teamId>', 'Specify a Team ID to fetch team context')
  .option('-u, --userId <userId>', 'Specify a User ID to fetch individual context')
  .action(async (options) => {
    try {
      const allContext: any = {};

      // Fetch Company Context
      try {
        const companyResponse = await axios.get('http://localhost:3001/api/company');
        allContext.company = companyResponse.data;
      } catch (error: any) {
        console.warn('Warning: Could not fetch company context.', error.message);
      }

      // Fetch Team Context
      if (options.teamId) {
        try {
          const teamResponse = await axios.get(`http://localhost:3001/api/teams/${options.teamId}/context`);
          allContext.team = teamResponse.data;
        } catch (error: any) {
          console.warn(`Warning: Could not fetch team context for Team ID ${options.teamId}.`, error.message);
        }
      }

      // Fetch Individual Context
      if (options.userId) {
        try {
          const userResponse = await axios.get(`http://localhost:3001/api/users/${options.userId}/context`);
          allContext.individual = userResponse.data;
        } catch (error: any) {
          console.warn(`Warning: Could not fetch individual context for User ID ${options.userId}.`, error.message);
        }
      }

      console.log('All Context:', JSON.stringify(allContext, null, 2));

    } catch (error: any) {
      console.error('Error fetching all context:', error.message);
    }
  });

program.parse(process.argv);