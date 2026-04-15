import axiosClient from '@/lib/axiosClient';
import { IUser } from './types';


export async function getMyUser() {
    try {
        const { data } = await axiosClient.get<IUser>('/user/profile', { withCredentials: true })
        return data
    } catch (error) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch profile'
    }
}