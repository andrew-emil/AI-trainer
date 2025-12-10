import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const globalNotifications = pgTable("global_notifications", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    deepLink: text("deep_link").default("/").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
    index("idx_global_notification_created_at").on(table.createdAt),
])