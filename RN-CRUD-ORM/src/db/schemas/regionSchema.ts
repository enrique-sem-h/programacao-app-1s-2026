import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { city } from "./citySchema";

export const region = sqliteTable("region", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  cityId: text("city_id")
    .notNull()
    .references(() => city.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});
