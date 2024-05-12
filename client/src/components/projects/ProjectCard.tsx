import React from 'react';
import { Link } from 'react-router-dom';
import { IProject } from '@models/ProjectModel';

interface ProjectCardProps {
  project: IProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`}>
      <div className="border rounded-lg overflow-hidden shadow-md">
        <img
          src={"https://images.unsplash.com/photo-1538514860079-8443cff3cb21?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt={project.name}
          className="w-full h-32 object-cover"
        />
        <div className="p-4">
          <div className="text-lg font-bold mb-2">{project.name}</div>
          <div className="text-gray-700">{project.description}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;