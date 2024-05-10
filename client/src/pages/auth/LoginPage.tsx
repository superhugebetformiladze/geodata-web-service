import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import LoginForm from '@components/auth/LoginForm';

const LoginPage = () => {

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Войдите в свой аккаунт
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <LoginForm />

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Еще нет аккаунта?{' '}
                        <Link to={'/register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Зарегистрируйтесь
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
