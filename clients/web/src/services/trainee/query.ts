import axiosClient from '@/lib/axiosClient';
import {
    TraineeWithUser,
    GetReviewsForTrainee,
    GetAssignedTrainersResponse,
    GetAssignedWorkoutPlansResponse,
    GetAssignedNutritionPlansResponse
} from './types';

export async function findAllTrainees() {
    try {
        const { data } = await axiosClient.get<TraineeWithUser[]>('/trainee/all')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch trainees'
    }
}

export async function findTraineeById(id?: string) {
    try {
        const url = id ? `/trainee/${id}` : `/trainee`;
        const { data } = await axiosClient.get<TraineeWithUser>(url)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch trainee'
    }
}

export async function getReviewsForTrainee() {
    try {
        const { data } = await axiosClient.get<GetReviewsForTrainee[]>('/trainee/reviews')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch reviews'
    }
}

export async function getAssignedTrainers() {
    try {
        const { data } = await axiosClient.get<GetAssignedTrainersResponse>('/trainee/assigned-trainer')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch assigned trainers'
    }
}

export async function getAssignedWorkoutPlans() {
    try {
        const { data } = await axiosClient.get<GetAssignedWorkoutPlansResponse[]>('/trainee/assigned-workout-plans')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch assigned workout plans'
    }
}

export async function getAssignedNutritionPlans() {
    try {
        const { data } = await axiosClient.get<GetAssignedNutritionPlansResponse[]>('/trainee/assigned-nutrition-plans')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to fetch assigned nutrition plans'
    }
}
