import React, { useState } from 'react';
import useUser from '@hooks/User/useUser';
import { Navigate } from "react-router-dom";
import { logoutUser } from "@api/auth/logoutApi"
import UserInfo from '@components/user/UserInfo';
import useProjects from '@hooks/Project/useProjects';


const ProfilePage: React.FC = () => {

  const [navigate, setNavigate] = useState(false);
  const onError = () => {
    setNavigate(true);
  }

  const proj = useProjects(onError);
  console.log("proj: ", proj)
  
  const user = useUser(onError);

  console.log("profile page user:", user)

  const logout = async () => {
    try {
      await logoutUser();
      window.location.reload();
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
        {user && (
          <UserInfo user={user} />
        )}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
