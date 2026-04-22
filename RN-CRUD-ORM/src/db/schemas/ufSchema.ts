import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const uf = sqliteTable("uf", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  abbreviation: text("abbreviation").notNull().unique(),
});
