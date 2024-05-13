import React from 'react';
import { IProject } from '@models/ProjectModel';


interface ProjectInfoProps {
  project: IProject;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">{project.name}</h1>
    </div>

  );
};

export default ProjectInfo;