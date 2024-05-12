import React from 'react';
import { IProject } from '@models/ProjectModel';


interface ProjectInfoProps {
  project: IProject;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  return (
    <div className="product-info container flex flex-col lg:flex-row gap-16 mx-auto py-8 lg:px-28">
      <div className="flex items-center justify-center w-full lg:w-1/2 h-[20rem] lg:h-[60vh] bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={"https://images.unsplash.com/photo-1538514860079-8443cff3cb21?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start justify-start w-full lg:w-1/2 ">
        <div className="text-2xl font-semibold mb-4">{project.name}</div>
        <div className="text-2xl font-normal mb-12">{project.description}</div>
        <div className="text-xl font-normal mb-4">{project.status}</div>
      </div>
    </div>
  );
};

export default ProjectInfo;