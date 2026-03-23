import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { ActivityType } from "@prisma/client";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateWorkoutSessionDto } from "./dto/create-workout-session.dto";
import { UpdateWorkoutSessionDto } from "./dto/update-workout-session.dto";
import { GroupedWorkoutResult } from "./interfaces/grouped-workoutr-result";
import { PaginatedWorkoutSessions } from "./interfaces/paginated-workout-sessions";
import { WorkoutLogsHelper } from "./providers/workout-logs.helper";

@Injectable()
export class WorkoutLogsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLogService: ActivityLogService,
    private readonly workoutLogsHelper: WorkoutLogsHelper,
  ) { }

  // ─── Session CRUD ─────────────────────────────────────────────────────────
  async create(dto: CreateWorkoutSessionDto, traineeId: string) {
    return this.prisma.$transaction(async (tx) => {
      await this.workoutLogsHelper.handleSessionDecrement(tx, traineeId);

      const session = await tx.workoutSession.create({
        data: {
          traineeId,
          dayId: dto.dayId,
          startedAt: dto.startedAt,
          finishedAt: dto.finishedAt ?? undefined,
          totalDuration: dto.totalDuration ?? undefined,
          totalRestTime: dto.totalRestTime ?? undefined,
          exercises: {
            create: dto.exercises.map((ex) => ({
              order: ex.order,
              startedAt: ex.startedAt,
              finishedAt: ex.finishedAt ?? undefined,
              totalRest: ex.totalRest ?? undefined,
              exercise: { connect: { id: ex.exerciseId } },
              sets: {
                create: ex.sets.map((set) => ({
                  setNumber: set.setNumber,
                  reps: set.reps,
                  weight: set.weight,
                  rir: set.rir ?? undefined,
                  duration: set.duration ?? undefined,
                  restAfter: set.restAfter ?? undefined,
                })),
              },
            })),
          },
        },
        include: { exercises: { include: { sets: true } } },
      });

      await this.activityLogService.createActivityLog({
        userId: traineeId,
        type: ActivityType.WORKOUT_COMPLETED,
        title: "Workout Completed",
        description: "Completed a workout session",
        metadata: {
          sessionId: session.id,
          dayId: dto.dayId,
          exerciseCount: dto.exercises.length,
        },
      });

      return session;
    });
  }

  async findOne(id: string) {
    const session = await this.prisma.workoutSession.findUnique({
      where: { id },
      include: {
        exercises: {
          orderBy: { order: "asc" },
          include: {
            exercise: { select: { name: true } },
            sets: { orderBy: { setNumber: "asc" } },
          },
        },
        workoutDay: { select: { name: true } },
      },
    });
    if (!session) throw new RpcException({
      message: "Workout session not found",
      status: 404,
    });
    return session;
  }

  async findAllByTrainee(
    traineeId: string,
    limit = 10,
    cursor?: string,
  ): Promise<PaginatedWorkoutSessions> {
    const sessions = await this.prisma.workoutSession.findMany({
      where: { traineeId },
      orderBy: { startedAt: "desc" },
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      select: {
        id: true,
        startedAt: true,
        finishedAt: true,
        workoutDay: { select: { name: true } },
      },
    });

    const nextCursor =
      sessions.length === limit ? sessions[sessions.length - 1].id : undefined;

    return { data: sessions, nextCursor };
  }

  async update(dto: UpdateWorkoutSessionDto) {
    await this.findOne(dto.id);

    return this.prisma.workoutSession.update({
      where: { id: dto.id },
      data: dto as any
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.workoutSession.delete({ where: { id } });
  }

  // ─── Analytics ────────────────────────────────────────────────────────────
  async getWorkoutSummary(
    traineeId: string,
    options?: {
      by?: ("dayId" | "exerciseId")[];
      dayId?: string;
      startDate?: string;
      endDate?: string;
    },
  ): Promise<GroupedWorkoutResult[]> {
    const groupByFields = options?.by ?? ["dayId"];

    const sessions = await this.prisma.workoutSession.findMany({
      where: {
        traineeId,
        dayId: options?.dayId,
        startedAt: {
          gte: options?.startDate ? new Date(options.startDate) : undefined,
          lte: options?.endDate ? new Date(options.endDate) : undefined,
        },
      },
      include: {
        exercises: {
          include: {
            exercise: { select: { name: true } },
            sets: true,
          },
        },
        workoutDay: { select: { name: true } },
      },
    });

    const results: Record<string, GroupedWorkoutResult> = {};

    for (const session of sessions) {
      for (const ex of session.exercises) {
        const key = groupByFields.includes("exerciseId")
          ? ex.exerciseId
          : session.dayId;

        results[key] ??= {
          dayId: session.dayId,
          dayName: session.workoutDay?.name,
          exerciseId: ex.exerciseId,
          exerciseName: ex.exercise.name,
          totalVolume: 0,
          totalWeight: 0,
          totalSets: 0,
          totalReps: 0,
        };

        for (const set of ex.sets) {
          results[key].totalSets += 1;
          results[key].totalReps += set.reps;
          results[key].totalWeight += set.weight;
          results[key].totalVolume += set.weight * set.reps;
        }
      }
    }

    return Object.values(results);
  }

  async getProgressiveOverload(
    traineeId: string,
    exerciseId?: string,
    dayId?: string,
  ) {
    const { sql, params } = this.workoutLogsHelper.buildWhereClause(traineeId, { exerciseId, dayId });

    const query = `
      WITH exercise_stats AS (
        SELECT
          we."exerciseId",
          s."startedAt"           AS logged_at,
          SUM(ws.weight * ws.reps) AS volume,
          MAX(ws.weight)           AS weight,
          SUM(ws.reps)             AS reps,
          AVG(ws.rir)              AS rir
        FROM "WorkoutSession" s
        JOIN "WorkoutExercise" we ON s.id = we."sessionId"
        JOIN "WorkoutSet"      ws ON we.id = ws."workoutExerciseId"
        WHERE ${sql}
        GROUP BY we."exerciseId", s."startedAt"
      )
      SELECT * FROM (
        SELECT
          "exerciseId", logged_at, volume, weight, reps, rir,
          LAG(volume) OVER (PARTITION BY "exerciseId" ORDER BY logged_at) AS previous_volume,
          LAG(weight) OVER (PARTITION BY "exerciseId" ORDER BY logged_at) AS previous_weight,
          LAG(reps)   OVER (PARTITION BY "exerciseId" ORDER BY logged_at) AS previous_reps,
          LAG(rir)    OVER (PARTITION BY "exerciseId" ORDER BY logged_at) AS previous_rir
        FROM exercise_stats
      ) sub
      ORDER BY logged_at DESC
      LIMIT 7;
    `;

    const rows: any[] = await this.prisma.$queryRawUnsafe(query, ...params);
    return rows.map(this.workoutLogsHelper.mapProgressiveOverloadRow);
  }

  async getLatestProgressiveOverload(
    traineeId: string,
    exerciseId?: string,
    dayId?: string,
  ) {
    const data = await this.getProgressiveOverload(traineeId, exerciseId, dayId);
    return data.slice(0, 1);
  }

  async getLatest1RMPerExercise(traineeId: string, exerciseId?: string) {
    const { sql, params } = this.workoutLogsHelper.buildWhereClause(traineeId, { exerciseId });

    const query = `
      SELECT DISTINCT ON (we."exerciseId")
        we."exerciseId",
        ws.weight,
        ws.reps,
        s."startedAt" AS logged_at
      FROM "WorkoutSession" s
      JOIN "WorkoutExercise" we ON s.id = we."sessionId"
      JOIN "WorkoutSet"      ws ON we.id = ws."workoutExerciseId"
      WHERE ${sql}
      ORDER BY we."exerciseId", s."startedAt" DESC, ws.weight DESC
    `;

    const rows: any[] = await this.prisma.$queryRawUnsafe(query, ...params);
    return rows.map((r) => ({
      exerciseId: r.exerciseId,
      loggedAt: r.logged_at,
      weight: r.weight,
      reps: r.reps,
      oneRepMax: r.reps > 0 ? r.weight * (1 + r.reps / 30) : r.weight,
    }));
  }
}