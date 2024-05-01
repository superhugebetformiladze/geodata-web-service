import React, { useState } from 'react';
import { registerUser } from '@api/auth/registerApi';
import { IUser } from '@models/UserModel';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState<IUser>({
        id: 0,
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await registerUser(formData);
            <Link to={'/login'}></Link>
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email-адрес
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Пароль
                        </label>
                        {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Забыли пароль?
                                    </a>
                                </div> */}
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                        Имя пользователя на сайте
                    </label>
                    <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                        Имя
                    </label>
                    <div className="mt-2">
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            required
                            value={formData.first_name}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                        Фамилия
                    </label>
                    <div className="mt-2">
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            required
                            value={formData.last_name}
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
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
