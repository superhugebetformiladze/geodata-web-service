import React, { useState } from 'react';
import useUser from '@hooks/User/useUser';
import { Navigate } from "react-router-dom";
import { logoutUser } from "@api/auth/logoutApi"


const ProfilePage = () => {

  const [navigate, setNavigate] = useState(false);

  const onError = () => {
    setNavigate(true);
  }

  const user = useUser(onError);

  console.log("profile page user:", user)

  const logout = async () => {
    try {
      await logoutUser();
      setNavigate(true);
    } catch (error) {
      console.error('Error logout:', error);
    }
  }

  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-md rounded px-8 py-6 mb-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Профиль пользователя</h1>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Имя пользователя
          </label>
          <p className="text-gray-700 text-lg"></p>
        </div>
        <div className="mt-4 mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email-адрес
          </label>
          <p className="text-gray-700 text-lg"></p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
