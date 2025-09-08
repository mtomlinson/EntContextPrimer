import axios from 'axios';

async function createCompanyContext() {
  try {
    const response = await axios.put('http://localhost:3001/api/company', {
      context: {
        companyName: 'Acme Corp',
        architecture: 'microservices'
      }
    });
    console.log('Company Context Created:', response.data);
  } catch (error: any) {
    console.error('Error creating company context:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

createCompanyContext();
