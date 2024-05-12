import axios, { AxiosResponse } from 'axios';
import { IProject } from '@models/ProjectModel';


export const fetchProjectById = async (projectId: number): Promise<IProject> => {
  try {
    const response: AxiosResponse<IProject> = await axios.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with id ${projectId}:`, error);
    throw error;
  }
};