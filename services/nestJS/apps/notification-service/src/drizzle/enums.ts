import { pgEnum } from "drizzle-orm/pg-core";

export const notificationType = pgEnum("notification_type", ["email", "sms", "push"])