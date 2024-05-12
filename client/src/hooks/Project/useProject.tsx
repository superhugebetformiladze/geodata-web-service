import { useEffect, useState } from 'react';
import { fetchProjectById } from '@api/projects/fetchProjectById';
import { IProject } from '@models/ProjectModel';

const useProject = (projectId: number) => {
  const [project, setProject] = useState<IProject>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await fetchProjectById(projectId);
        setProject(projectsData);
      } catch (error) {
        console.error('Error setting project:', error);
      }
    };

    fetchData();
  }, [projectId]);

  return project;
};

export default useProject;