import { mysqlTable, varchar, int, timestamp } from "drizzle-orm/mysql-core";
import { randomUUID } from "node:crypto";
import { alugueis } from "./alugueisSchema.ts";
import { usuarios } from "./usuariosSchema.ts";

export const avaliacoes = mysqlTable("avaliacoes", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  aluguelId: varchar("aluguel_id", { length: 36 })
    .references(() => alugueis.id, { onDelete: "cascade" })
    .notNull()
    .unique(), 
  avaliadorId: varchar("avaliador_id", { length: 36 })
    .references(() => usuarios.id, { onDelete: "cascade" })
    .notNull(),
  estrelas: int("estrelas").notNull(),
  comentario: varchar("comentario", { length: 500 }),
  criadoEm: timestamp("criado_em").defaultNow(),
});