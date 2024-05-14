import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ProjectInfo from '@components/projects/ProjectInfo';
import useProject from '@hooks/Project/useProject';
import ProjectMap from '@components/Draw/ProjectMap';
import { deleteProject } from '@api/projects/deleteProject';
import { saveProjectChanges } from '@api/projects/saveProjectChanges';


const ProjectInfoPage: React.FC = () => {
    const { projectId } = useParams();

    const [navigate, setNavigate] = useState(false);
    const onError = () => {
        setNavigate(true);
    }
    const project = useProject(Number(projectId), onError);

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
            await saveProjectChanges(Number(projectId), project);

        } catch (error) {
            console.error('Error saving project:', error);
        }

        setNavigate(true);
    };

    const handleGeoJsonData = (geoJsonData: any) => {
        console.log('Данные с карты в компоненте страницы: ', geoJsonData);
    };

    if (navigate) {
        return <Navigate to="/projects"/>;
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
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-red-300 inline-block mx-auto mr-2"
                >
                    Удалить проект
                </button>
                <button
                    onClick={handleSaveProject}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-red-300 inline-block mx-auto"
                >
                    Сохранить изменения
                </button>
            </div>
        </div>
    );
};

export default ProjectInfoPage;
