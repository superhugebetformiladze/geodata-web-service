import { useEffect, useState, useCallback } from 'react';
import { fetchUser } from '@api/user/userApi';
import { IUser } from '@models/UserModel';


const useUser = (onError: () => void) => {
    console.log("мама я в телике")
    const [user, setUser] = useState<IUser>(null);

    const fetchData = useCallback(async () => {
        console.log("жопа")
        try {
            console.log("а я тут")
            const { data, status } = await fetchUser();
            if (status === 403) {
                onError();
            }
            else {
                setUser(data);
            }
        } catch (error) {
            console.error('Error setting user:', error);
        }
    }, [onError]);

    useEffect(() => {
        fetchData();
    }, []);

    return user;
};

export default useUser;
