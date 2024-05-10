import { useEffect, useState } from 'react';
import { fetchUser } from '@api/user/userApi';
import { IUser } from '@models/UserModel';


const useUser = (onError: () => void) => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUser();
                console.log("hook-2: ", userData)
                setUser(userData);
            } catch (error) {
                console.error('Error getting user data:', error);
                onError();
            }
        };

        fetchData();
    }, [onError]);

    console.log("hook: ", user)
    return user;
};

export default useUser;
