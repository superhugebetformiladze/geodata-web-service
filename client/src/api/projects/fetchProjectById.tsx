import axios, { AxiosResponse } from 'axios';
import { IProject } from '@models/ProjectModel';


export const fetchProjectById = async (projectId: number): Promise<{ data: IProject; status: number }> => {
  try {
    const response: AxiosResponse<IProject> = await axios.get(`/projects/${projectId}`);
    return { data: response.data, status: response.request.status };
  } catch (error) {
    console.error(`Error fetching project with id ${projectId}:`, error);
    throw error;
  }
};