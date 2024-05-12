import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProjectInfo from '@components/projects/ProjectInfo';
import useProject from '@hooks/Project/useProject';


const ProjectInfoPage: React.FC = () => {
    const { projectId } = useParams();
    const project = useProject(Number(projectId));

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Проекты</h1>
            {project &&(
                <div className="mb-6">
                    <ProjectInfo project={project}/>  
                </div>
            )}
            <div className="text-center">
                <Link to="/projects" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 inline-block mx-auto">
                    Назад
                </Link>
            </div>
        </div>
    );
};

export default ProjectInfoPage;
