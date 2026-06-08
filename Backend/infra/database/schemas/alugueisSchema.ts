import { mysqlTable, varchar, float, date, timestamp } from "drizzle-orm/mysql-core";
import { randomUUID } from "node:crypto";
import { usuarios } from "./usuariosSchema.ts";
import { anuncios } from "./anunciosSchema.ts";

export const alugueis = mysqlTable("alugueis", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  status: varchar("status", {
    length: 50,
    enum: ["pendente", "ativo", "em_uso", "finalizado", "cancelado"],
  }).notNull().default("pendente"),
  valorTotal: float("valor_total").notNull(),
  caucao: float("caucao").notNull(),
  dataInicio: varchar("data_inicio", { length: 10 }).notNull(),
  dataFim: varchar("data_fim", { length: 10 }).notNull(),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  metodoPagamento: varchar("metodo_pagamento", { length: 50 }),
  locatarioId: varchar("locatario_id", { length: 36 })
    .references(() => usuarios.id, { onDelete: "cascade" })
    .notNull(),
  anuncioId: varchar("anuncio_id", { length: 36 })
    .references(() => anuncios.id, { onDelete: "cascade" })
    .notNull(),
  criadoEm: timestamp("criado_em").defaultNow(),
});