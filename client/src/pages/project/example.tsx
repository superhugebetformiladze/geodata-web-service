import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ProjectInfo from '@components/projects/ProjectInfo';
import useProject from '@hooks/Project/useProject';
import ProjectMap from '@components/Draw/Example';
import { deleteProject } from '@api/projects/deleteProject';
import { saveGeoObject } from '@api/geoObject/saveGeoObject';
import { GeoJsonObject } from 'geojson';
import Draw from '@components/Draw/Draw';

const ProjectInfoPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const [navigate, setNavigate] = useState(false);
  const onError = () => {
    setNavigate(true);
  };

  const { project, geoObject } = useProject(Number(projectId), onError);

  const [geoObjectData, setGeoObjectData] = useState<GeoJsonObject | null>(null);

  useEffect(() => {
    if (geoObject && geoObject.object_data) {
      let parsedObjectData: GeoJsonObject;
      if (typeof geoObject.object_data === 'string') {
        parsedObjectData = JSON.parse(geoObject.object_data);
      } else {
        parsedObjectData = geoObject.object_data;
      }
      setGeoObjectData(parsedObjectData);
    }
  }, [geoObject]);

  const handleGeoJsonData = (geoJsonData: GeoJsonObject) => {
    setGeoObjectData(geoJsonData);
  };

  const handleDelete = async () => {
    try {
      await deleteProject(Number(projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
    setNavigate(true);
  };

  const handleSaveProject = async () => {
    try {
      if (project && geoObjectData) {
        const geoObjectId = project.geo_object;
        const updatedGeoObject = {
          id: geoObjectId,
          object_data: geoObjectData
        };

        await saveGeoObject(geoObjectId, updatedGeoObject);
      } else {
        console.error('Project or geoJsonData is missing.');
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const generateEmbedCode = () => {
    if (geoObject) {
      return `<script src="http://localhost:3000/map.js?id=${geoObject.id}"></script>`;
    } else {
      return 'Выберите геообъект';
    }
  };

  const handleGetEmbedCode = () => {
    const embedCode = generateEmbedCode();
    console.log(embedCode);
  };

  if (navigate) {
    return <Navigate to="/projects" />;
  }

  return (
    <div className="container mx-auto p-4">
      {project && (
        <div className="mb-6">
          <ProjectInfo project={project} />
        </div>
      )}
      <div className='mb-6'>
        <ProjectMap geoObjectDB={geoObject} />
        {/* <Draw /> */}
      </div>

      <div className="text-center">
        <Link to="/projects" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 inline-block mx-auto mr-2">
          Назад
        </Link>
        <Link to={`/projects/${projectId}/edit`} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 inline-block mx-auto mr-2">
          Изменить
        </Link>
        <button
          onClick={handleSaveProject}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-red-300 inline-block mx-auto mr-2"
        >
          Сохранить изменения
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-red-300 inline-block mx-auto"
        >
          Удалить проект
        </button>
        <div className="mt-4">
          <input type="text" value={generateEmbedCode()} readOnly className="border border-gray-300 px-2 py-1 rounded-md mr-2" style={{ width: '300px' }} />
          <button onClick={handleGetEmbedCode} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 inline-block">
            Получить код для вставки
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoPage;
