import axiosClient from '@/lib/axiosClient';
import {
    CreateTrainerDto,
    UpdateTrainerDto,
    ProcessTraineeRequestResponse,
    CreateTraineeWorkoutPlanDto,
    CreateTraineeNutritionPlanDto,
    Trainer,
    TraineeWorkoutPlan,
    TraineeNutritionPlan
} from './types';


export async function updateTrainer(dto: UpdateTrainerDto) {
    try {
        const { data } = await axiosClient.patch<Trainer>('/trainers', dto)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to update trainer'
    }
}

export async function deleteTrainer() {
    try {
        const { data } = await axiosClient.delete<Trainer>('/trainers')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to delete trainer'
    }
}

export async function processTraineeRequest(reqId: string, approve: boolean) {
    try {
        const { data } = await axiosClient.post<ProcessTraineeRequestResponse>(`/trainers/trainees/${reqId}`, { approve })
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to process trainee request'
    }
}

export async function unassignTrainee(traineeId: string) {
    try {
        const { data } = await axiosClient.delete<void>(`/trainers/trainees/${traineeId}`)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to unassign trainee'
    }
}

export async function assignWorkoutPlan(dto: CreateTraineeWorkoutPlanDto) {
    try {
        const { data } = await axiosClient.post<TraineeWorkoutPlan>('/trainers/workout-plans', dto)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to assign workout plan'
    }
}

export async function updateWorkoutPlanAssignment(traineeId: string, planId: string, dto: Partial<CreateTraineeWorkoutPlanDto>) {
    try {
        const { data } = await axiosClient.patch<TraineeWorkoutPlan>(`/trainers/workout-plans/${traineeId}/${planId}`, dto)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to update workout plan assignment'
    }
}

export async function setWorkoutPlanActiveStatus(traineeId: string, planId: string, active: boolean) {
    try {
        const { data } = await axiosClient.patch<TraineeWorkoutPlan>(`/trainers/workout-plans/${traineeId}/${planId}/active`, { active })
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to set workout plan active status'
    }
}

export async function unassignWorkoutPlan(traineeId: string, planId: string) {
    try {
        const { data } = await axiosClient.delete<void>(`/trainers/workout-plans/${traineeId}/${planId}`)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to unassign workout plan'
    }
}

export async function assignNutritionPlan(dto: CreateTraineeNutritionPlanDto) {
    try {
        const { data } = await axiosClient.post<TraineeNutritionPlan>('/trainers/nutrition-plans', dto)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to assign nutrition plan'
    }
}

export async function updateNutritionPlanAssignment(traineeId: string, nutritionPlanId: string, dto: Partial<CreateTraineeNutritionPlanDto>) {
    try {
        const { data } = await axiosClient.patch<TraineeNutritionPlan>(`/trainers/nutrition-plans/${traineeId}/${nutritionPlanId}`, dto)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to update nutrition plan assignment'
    }
}

export async function setNutritionPlanActiveStatus(traineeId: string, nutritionPlanId: string, active: boolean) {
    try {
        const { data } = await axiosClient.patch<TraineeNutritionPlan>(`/trainers/nutrition-plans/${traineeId}/${nutritionPlanId}/active`, { active })
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to set nutrition plan active status'
    }
}

export async function unassignNutritionPlan(traineeId: string, nutritionPlanId: string) {
    try {
        const { data } = await axiosClient.delete<void>(`/trainers/nutrition-plans/${traineeId}/${nutritionPlanId}`)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to unassign nutrition plan'
    }
}

export async function calculateRankScore(trainerId: string) {
    try {
        const { data } = await axiosClient.patch<Trainer>(`/trainers/${trainerId}/calculate-rank`)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to calculate rank score'
    }
}
