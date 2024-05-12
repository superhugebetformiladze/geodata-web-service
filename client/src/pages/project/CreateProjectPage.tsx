import React from 'react';
import CreateProjectForm from '@components/projects/CreateProjectForm';


const CreateProjectPage = () => {

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Создайте новый проект
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    
                    <CreateProjectForm />

                </div>
            </div>
        </>
    )
}

export default CreateProjectPage;
