import Joi from "joi";

export interface ICreateBodyWeightLog {
    id: string;
    traineeId: string;
    weight: number;
    smm?: number | null;
    pbf?: number | null;
    loggedAt: Date;
}

export const createBodyWeightLogSchema = Joi.object<ICreateBodyWeightLog>({
    id: Joi.string().required(),
    traineeId: Joi.string().required(),
    weight: Joi.number().required(),
    smm: Joi.number().optional(),
    pbf: Joi.number().optional(),
    loggedAt: Joi.date().required(),
})