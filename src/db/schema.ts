import { foreignKey, uuid } from "drizzle-orm/gel-core";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const uf = sqliteTable("uf", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nome: text("nome").notNull().unique(),
  sigla: text("sigla").unique().notNull(),
});

export const cidade = sqliteTable("cidade", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nome: text("nome").notNull().unique(),
  uf_id: integer("uf_id").references(() => uf.id, {
    onDelete: "cascade",
  }),
});

export const regiao = sqliteTable("regiao", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nome: text("nome").notNull().unique(),
  cidade_id: integer("cidade_id").references(() => cidade.id, {
    onDelete: "cascade",
  }),
});
