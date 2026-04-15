import axiosClient from '@/lib/axiosClient';
import {
    TrainerWithUser,
    TraineeRequestResponseDto,
    GetAssignedTraineesResponse,
    GetAssignedWorkoutPlans,
    GetAllTraineesWithWorkoutPlans,
    GetAssignedNutritionPlans,
    GetAllTraineesWithNutritionPlans,
    GetReviewsForTrainer
} from './types';

export async function findAllTrainers(isActive?: boolean) {
    try {
        const { data } = await axiosClient.get<TrainerWithUser[]>('/trainers', { params: { isActive } })
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch trainers'
    }
}

export async function findTrainerById(id: string) {
    try {
        const { data } = await axiosClient.get<TrainerWithUser>(`/trainers/${id}`)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch trainer'
    }
}

export async function getTraineeRequests() {
    try {
        const { data } = await axiosClient.get<TraineeRequestResponseDto[]>('/trainers/trainee-requests')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch trainee requests'
    }
}

export async function getAssignedTrainees() {
    try {
        const { data } = await axiosClient.get<GetAssignedTraineesResponse[]>('/trainers/trainees')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch assigned trainees'
    }
}

export async function getAssignedWorkoutPlanForTrainee(traineeId: string, active?: boolean) {
    try {
        const { data } = await axiosClient.get<GetAssignedWorkoutPlans[]>(`/trainers/workout-plans/${traineeId}`, { params: { active } })
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch workout plan for trainee'
    }
}

export async function getAllTraineesAndTheirAssignedPlans() {
    try {
        const { data } = await axiosClient.get<GetAllTraineesWithWorkoutPlans[]>('/trainers/trainees-workout-plans')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch trainees and their workout plans'
    }
}

export async function getAssignedNutritionPlanForTrainee(traineeId: string, active?: boolean) {
    try {
        const { data } = await axiosClient.get<GetAssignedNutritionPlans[]>(`/trainers/nutrition-plans/${traineeId}`, { params: { active } })
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch nutrition plan for trainee'
    }
}

export async function getAllTraineesAndTheirAssignedNutritionPlans() {
    try {
        const { data } = await axiosClient.get<GetAllTraineesWithNutritionPlans[]>('/trainers/trainees-nutrition-plans')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch trainees and their nutrition plans'
    }
}

export async function getReviewsForTrainer(id: string) {
    try {
        const { data } = await axiosClient.get<GetReviewsForTrainer[]>(`/trainers/reviews/${id}`)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch reviews'
    }
}
