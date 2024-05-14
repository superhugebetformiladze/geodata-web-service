import React, { useState } from 'react';
import { saveProjectChanges } from '@api/projects/saveProjectChanges';
import { IProject } from '@models/ProjectModel';
import { useParams, Navigate } from 'react-router-dom';

const EditProjectForm = () => {
    const { projectId } = useParams(); // Получаем параметр projectId из URL
    const [formData, setFormData] = useState<IProject>({
        id: 0,
        name: '',
        description: '',
        status: '',
        created_at: new Date(),
    });
    const [navigate, setNavigate] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await saveProjectChanges(Number(projectId), formData);
        } catch (error) {
            console.error('Error saving project changes:', error);
        }

        setNavigate(true);
    };

    if (navigate) {
        return <Navigate to={`/projects/${projectId}`}/>;
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Название проекта
                </label>
                <div className="mt-2">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Описание
                </label>
                <div className="mt-2">
                    <input
                        id="description"
                        name="description"
                        type="text"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Сохранить
                </button>
            </div>
        </form>
    );
};

export default EditProjectForm;
