import React from 'react';
import EditProjectForm from '@components/projects/EditProjectForm';


const EditProjectPage = () => {

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Внести изменения в проект
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    
                    <EditProjectForm />

                </div>
            </div>
        </>
    )
}

export default EditProjectPage;
