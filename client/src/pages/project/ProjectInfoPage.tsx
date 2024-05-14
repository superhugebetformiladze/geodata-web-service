import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ProjectInfo from '@components/projects/ProjectInfo';
import useProject from '@hooks/Project/useProject';
import ProjectMap from '@components/Draw/ProjectMap';
import { deleteProject } from '@api/projects/deleteProject';
import { saveGeoObject } from '@api/geoObject/saveGeoObject';


const ProjectInfoPage: React.FC = () => {
    const { projectId } = useParams();

    const [navigate, setNavigate] = useState(false);
    const onError = () => {
        setNavigate(true);
    }
    const project = useProject(Number(projectId), onError);
    const [geoObjectData, setGeoObjectData] = useState();

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

                console.log("данные со страницы: ", geoObjectId, geoObjectData)

                await saveGeoObject(geoObjectId, geoObjectData);
            } else {
                console.error('Project or geoJsonData is missing.');
            }

        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleGeoJsonData = (geoJsonData: any) => {
        setGeoObjectData(geoJsonData);
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
                <ProjectMap onGeoJsonData={handleGeoJsonData} />
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
            </div>
        </div>
    );
};

export default ProjectInfoPage;
