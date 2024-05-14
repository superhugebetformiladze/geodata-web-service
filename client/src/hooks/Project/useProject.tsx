import { useCallback, useEffect, useState } from 'react';
import { fetchProjectById } from '@api/projects/fetchProjectById';
import { fetchGeoObject } from '@api/geoObject/fetchGeoObject';
import { IProject } from '@models/ProjectModel';
import { IGeoObject } from '@models/GeoObjectModel';

const useProject = (projectId: number, onError: () => void) => {
  const [project, setProject] = useState<IProject>(null);
  const [geoObject, setGeoObject] = useState<IGeoObject>(null); // Состояние для хранения геоданных

  const fetchData = useCallback(async () => {
    try {
      const { data: projectData, status } = await fetchProjectById(projectId);
      if (status === 403) {
        onError();
      } else {
        setProject(projectData);
        // Проверка на наличие geo_object в проекте перед вызовом fetchGeoObject
        if (projectData && projectData.geo_object) {
          const { data: geoData, status: geoStatus } = await fetchGeoObject(projectData.geo_object);
          if (geoStatus === 200) {
            setGeoObject(geoData);
          } else {
            console.error('Error fetching geo data');
          }
        }
      }
    } catch (error) {
      console.error('Error setting project:', error);
    }
  }, [onError, projectId]);

  useEffect(() => {
    fetchData();
  }, []);

  return { project, geoObject }; // Возвращаем и проект, и геоданные
};

export default useProject;
