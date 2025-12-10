import { sql } from "drizzle-orm";
import { index, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { globalNotifications } from "./globalNotifications.schema";

export const userGlobalNotificationState = pgTable("user_global_notification_state", {
    userId: uuid("user_id").notNull(),
    notificationId: uuid("notification_id").notNull().references(() => globalNotifications.id),
    readAt: timestamp("read_at"),
}, (table) => [
    primaryKey({ columns: [table.userId, table.notificationId] }),
    index("idx_user_global_notif_unread").on(table.readAt).where(sql`${table.readAt} IS NULL`)
])