export interface GroupedWorkoutResult {
  dayId?: string;
  dayName?: string;
  exerciseId?: string;
  exerciseName?: string;
  totalVolume: number;
  totalWeight: number;
  totalSets: number;
  totalReps: number;
}