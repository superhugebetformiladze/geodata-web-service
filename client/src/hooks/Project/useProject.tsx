import { useCallback, useEffect, useState } from 'react';
import { fetchProjectById } from '@api/projects/fetchProjectById';
import { IProject } from '@models/ProjectModel';

const useProject = (projectId: number, onError: () => void) => {
  const [project, setProject] = useState<IProject>(null);

  const fetchData = useCallback(async () => {
    try {
      const { data, status } = await fetchProjectById(projectId);
      if (status === 403) {
        onError();
      }
      else {
        setProject(data);
      }
    } catch (error) {
      console.error('Error setting project:', error);
    }
  }, [onError]);

  useEffect(() => {
    fetchData();
  }, []);

  return project;
};

export default useProject;