import axios, { AxiosResponse } from 'axios';
import { IProject } from '@models/ProjectModel';



export const fetchProjects = async (): Promise<{ data: IProject[]; status: number }> => {
  try {
    const response: AxiosResponse<IProject[]> = await axios.get('/projects');
    return { data: response.data, status: response.request.status };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

