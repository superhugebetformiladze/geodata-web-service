import React from 'react';
import { Link } from 'react-router-dom';

const MainComponent: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/main-page-background.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <header className="relative z-10 py-6">
        <h1 className="text-4xl font-bold text-white">Геоданные Маркер</h1>
      </header>
      <main className="relative z-10 mt-12 text-white flex flex-col items-center justify-center">
        <p className="text-lg">
          Добро пожаловать в Геоданные Маркер! Это приложение поможет вам размечать географические данные.
        </p>
        <Link to={'/projects'}>
          <div className="mt-6 px-20 py-3 bg-lime-600 text-white rounded-md hover:bg-lime-700 focus:outline-none focus:bg-blue-600">
            Начать
          </div>
        </Link>
      </main>
    </div>
  );
}

export default MainComponent;
