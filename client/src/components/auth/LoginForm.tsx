import React, { useState, useEffect } from 'react';
import { loginUser } from '@api/auth/loginApi';
import { IUser } from '@models/UserModel';
import {Navigate} from "react-router-dom";


const LoginForm = () => {

    const [formData, setFormData] = useState<IUser>({
        id: 0,
        name: '',
        email: '',
        password: '',
    });

    const [navigate, setNavigate] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await loginUser(formData);
        } catch (error) {
            console.error('Error login:', error);
        }

        setNavigate(true);
    };

    if (navigate) {
        return <Navigate to="/profile"/>;
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email-адрес
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="text"
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
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Войти
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
