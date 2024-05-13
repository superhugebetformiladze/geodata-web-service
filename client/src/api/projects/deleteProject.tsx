import axios from 'axios';


export const deleteProject = async (projectId: number): Promise<void> => {
    try {
        await axios.delete(`/projects/${projectId}`);
    } catch (error) {
        console.error(`Error deleting project with id ${projectId}:`, error);
        throw error;
    }
};
