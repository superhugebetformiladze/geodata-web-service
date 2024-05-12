import React from 'react';
import ProjectCard from './ProjectCard';
import useProjects from '@hooks/Project/useProjects';

const ProjectList: React.FC = () => {
  const projects = useProjects();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;