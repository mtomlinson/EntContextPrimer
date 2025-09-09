import axios from 'axios';
import { API_BASE_URL } from './config';

export const getCompanyContext = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/company`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching company context:', error.message);
    throw error;
  }
};

export const getTeams = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching teams:', error.message);
    throw error;
  }
};

export const getTeamContext = async (teamId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/${teamId}/context`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching team context for team ID ${teamId}:`, error.message);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

export const getUser = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching user for user ID ${userId}:`, error.message);
    throw error;
  }
};

export const getIndividualContext = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/context`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching individual context for user ID ${userId}:`, error.message);
    throw error;
  }
};
