import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ProjectInfo from '@components/projects/ProjectInfo';
import useProject from '@hooks/Project/useProject';
import Example2 from '@components/example/Example2';
import { deleteProject } from '@api/projects/deleteProject';


const ProjectInfoPage: React.FC = () => {
    const { projectId } = useParams();
    const project = useProject(Number(projectId));

    const [navigate, setNavigate] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteProject(Number(projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
        }

        setNavigate(true);
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
            <Example2 />
            <div className="text-center">
                <Link to="/projects" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 inline-block mx-auto mr-2">
                    Назад
                </Link>
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
