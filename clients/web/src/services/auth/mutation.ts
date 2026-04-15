import axiosClient from '@/lib/axiosClient';
import { AuthResponse, LoginDto, RegisterAsTraineeDto, RegisterAsTrainerDto } from './types';

export async function login(loginDto: LoginDto) {
    try {
        const { data } = await axiosClient.post<AuthResponse>('/auth/login', loginDto)
        return data
    } catch (error) {
        console.log(error)
        throw error.response.data.message
    }
}

export async function registerAsTrainee(registerAsTraineeDto: RegisterAsTraineeDto) {
    try {
        const { data } = await axiosClient.post<AuthResponse>('/auth/register-as-trainee', registerAsTraineeDto)
        return data
    } catch (error) {
        console.log(error)
        throw error.response.data.message
    }
}

export async function registerAsTrainer(registerAsTrainerDto: RegisterAsTrainerDto) {
    try {
        const { data } = await axiosClient.post<{ message: string }>('/auth/register-as-trainer', registerAsTrainerDto)
        return data
    } catch (error) {
        console.log(error)
        throw error.response.data.message
    }
}

export async function forgetPassword(email: string) {
    try {
        const { data } = await axiosClient.post<{ message: string }>('/auth/forget-password', { email })
        return data
    } catch (error) {
        console.log(error)
        throw error.response.data.message
    }
}

export async function resetPassword(token: string, password: string) {
    try {
        const { data } = await axiosClient.post<{ message: string }>('/auth/reset-password', { token, password })
        return data
    } catch (error) {
        console.log(error)
        throw error.response.data.message
    }
}

export async function refreshAccessToken() {
    try {
        const { data } = await axiosClient.post<AuthResponse>('/auth/refresh', {}, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error)
        throw error.response.data.message
    }
}

export async function logout() {
    try {
        const { data } = await axiosClient.post<{ message: string }>('/auth/logout', {}, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error)
        throw error.response.data.message
    }
}