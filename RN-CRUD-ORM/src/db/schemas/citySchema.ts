import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { uf } from "./ufSchema";

export const city = sqliteTable("city", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ufId: text("uf_id")
    .notNull()
    .references(() => uf.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});
