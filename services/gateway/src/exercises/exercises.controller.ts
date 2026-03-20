import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRole } from "src/common/enums/entities.enum";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { ExercisesService } from "./exercises.service";

@Controller("exercises")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.TRAINER, UserRole.ADMIN)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) { }

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  findAll(@Query("limit") limit: number, @Query("page") page: number) {
    return this.exercisesService.findAll(limit, page);
  }

  @Roles(UserRole.TRAINEE)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.exercisesService.findOne(id);
  }

  @Get("target-muscle/:muscle")
  findByTargetMuscle(@Param("muscle") muscle: string) {
    return this.exercisesService.findByTargetMuscle(muscle);
  }

  @Get("body-part/:bodyPart")
  findByBodyPart(@Param("bodyPart") bodyPart: string) {
    return this.exercisesService.findByBodyPart(bodyPart);
  }

  @Get("equipment/:equipment")
  findByEquipment(@Param("equipment") equipment: string) {
    return this.exercisesService.findByEquipment(equipment);
  }

  @Get("name/:name")
  findByName(@Param("name") name: string) {
    return this.exercisesService.findByName(name);
  }
}

