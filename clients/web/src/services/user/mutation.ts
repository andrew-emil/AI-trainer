import axiosClient from '@/lib/axiosClient';
import { UpdateUserDto, IUser } from './types';

export async function updateUser(dto: UpdateUserDto) {
    try {
        const { data } = await axiosClient.patch<IUser>('/user', dto)
        return data
    } catch (error) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to update user'
    }
}