import { useEffect, useState, useCallback } from 'react';
import { fetchProjects } from '@api/projects/fetchProjects';

const useProjects = (onError: () => void) => {
  const [projects, setProjects] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const { data, status } = await fetchProjects();
      if (status === 403) {
        onError();
      }
      else {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error setting projects:', error);
    }
  }, [onError]);

  useEffect(() => {
    fetchData();
  }, []);

  return projects;
};

export default useProjects;
