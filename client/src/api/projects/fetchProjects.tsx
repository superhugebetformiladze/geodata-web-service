import axios, { AxiosResponse } from 'axios';
import { IProject } from '@models/ProjectModel';



export const fetchProjects = async (): Promise<IProject[]> => {
  try {
    const response: AxiosResponse<IProject[]> = await axios.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};