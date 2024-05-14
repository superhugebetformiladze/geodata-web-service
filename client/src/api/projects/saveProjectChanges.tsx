import axios from 'axios';
import { IProject } from '@models/ProjectModel';

export const saveProjectChanges = async (projectId: number, projectData: IProject): Promise<void> => {
  try {
    await axios.put(`/projects/${projectId}`, projectData);
  } catch (error) {
    console.error(`Error saving project changes for project with id ${projectId}:`, error);
    throw error;
  }
};
