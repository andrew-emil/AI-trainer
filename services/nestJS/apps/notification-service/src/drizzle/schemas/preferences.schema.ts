import { boolean, index, pgTable, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { notificationType } from "../enums";

export const preferences = pgTable("preferences", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    notificationType: notificationType("notification_type").notNull(),
    isEnabled: boolean("is_enabled").notNull().default(true),

}, (table) => [
    index("idx_preferences_user").on(table.userId),
    uniqueIndex("ux_preferences_user_type").on(
        table.userId,
        table.notificationType,
    ),
])