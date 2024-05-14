import React from 'react';
import { IUser } from '@models/UserModel';


interface UserInfoProps {
    user: IUser;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    console.log("info user: ", user)
    return (
        <div>
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Профиль пользователя</h1>
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Имя пользователя
                </label>
                <p className="text-gray-700 text-lg">{user.name}</p>
            </div>
            <div className="mt-4 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email-адрес
                </label>
                <p className="text-gray-700 text-lg">{user.email}</p>
            </div>
        </div>

    );
};

export default UserInfo;