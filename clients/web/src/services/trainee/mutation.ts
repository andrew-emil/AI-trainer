import axiosClient from '@/lib/axiosClient';
import {
    CreateTraineeDto,
    UpdateTraineeDto,
    CreateTrainerReviewDto,
    UpdateTrainerReviewDto,
    Trainee,
    GetReviewsForTrainee,
    TrainerTraineeRequest
} from './types';

export async function updateTrainee(dto: UpdateTraineeDto) {
    try {
        const { data } = await axiosClient.patch<Trainee>('/trainee', dto)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to update trainee'
    }
}

export async function deleteTrainee() {
    try {
        const { data } = await axiosClient.delete<Trainee>('/trainee')
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to delete trainee'
    }
}

export async function createReview(dto: CreateTrainerReviewDto) {
    try {
        const { data } = await axiosClient.post<GetReviewsForTrainee>('/trainee/review', dto)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to create review'
    }
}

export async function updateReview(reviewId: string, dto: UpdateTrainerReviewDto) {
    try {
        const { data } = await axiosClient.patch<GetReviewsForTrainee>(`/trainee/review/${reviewId}`, dto)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to update review'
    }
}

export async function deleteReview(reviewId: string) {
    try {
        const { data } = await axiosClient.delete<GetReviewsForTrainee>(`/trainee/review/${reviewId}`)
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to delete review'
    }
}

export async function createTrainerRequest(trainerId: string, sessionsCount: number) {
    try {
        const { data } = await axiosClient.post<TrainerTraineeRequest>(`/trainee/trainer-request/${trainerId}`, { sessionsCount })
        return data
    } catch (error: any) {
        console.log(error)
        throw error.response?.data?.message || 'Failed to create trainer request'
    }
}
