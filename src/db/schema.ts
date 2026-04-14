import { foreignKey, uuid } from "drizzle-orm/gel-core";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const uf = sqliteTable("uf", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nome: text("nome").notNull().unique(),
  sigla: text("sigla").unique().notNull(),
});

const cidade = sqliteTable("cidade", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nome: text("nome").notNull().unique(),
  uf_id: integer("uf_id").references(() => uf.id, {
    onDelete: "cascade",
  }),
});

const regiao = sqliteTable("regiao", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nome: text("nome").notNull().unique(),
  cidade_id: integer("cidade_id").references(() => cidade.id, {
    onDelete: "cascade",
  }),
});

export default {
  uf,
  cidade,
  regiao,
};
