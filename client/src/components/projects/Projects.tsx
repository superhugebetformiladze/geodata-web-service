import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import useProjects from '@hooks/Project/useProjects';
import { Navigate } from 'react-router-dom';

const ProjectList: React.FC = () => {
  const [navigate, setNavigate] = useState(false);
  const onError = () => {
    setNavigate(true);
  }
  const projects = useProjects(onError);

  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;