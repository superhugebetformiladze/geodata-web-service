import axios from 'axios';


export const createProject = async (projectData: any) => {
  try {
    console.log("project data: ", projectData)
    await axios.post('projects/create', projectData);
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};