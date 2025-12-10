import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { notificationType } from "../enums"

export const notification = pgTable("notification", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    deepLink: text("deep_link").default("/").notNull(),
    targetEntityId: uuid("target_entity_id").notNull(),
    notificationType: notificationType("notification_type").notNull(),
    readAt: timestamp("read_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),

}, (table) => [
    index("idx_notifications_user_created_at").on(
        table.userId,
        table.createdAt,
    ),
])