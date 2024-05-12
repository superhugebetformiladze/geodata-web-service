import React from 'react';
import { Link } from 'react-router-dom';
import ProjectList from '@components/projects/Projects';

const ProjectPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Проекты</h1>
            <div className="mb-6">
                <ProjectList />  
            </div>
            <div className="text-center">
                <Link to="/projects/create" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300 inline-block mx-auto">
                    Создать проект
                </Link>
            </div>
        </div>
    );
};

export default ProjectPage;
