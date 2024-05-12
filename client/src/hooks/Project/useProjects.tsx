import { useEffect, useState } from 'react';
import { fetchProjects } from '@api/projects/fetchProjects';

const useProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error setting projects:', error);
      }
    };

    fetchData();
  }, []);

  return projects;
};

export default useProjects;