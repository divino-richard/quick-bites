import { Credentials } from '@/types/user.types';
import api from '@/utils/api';

export const loginUser = async (credentials: Credentials) => {
    return await api.post('/auth/login', credentials);
};


