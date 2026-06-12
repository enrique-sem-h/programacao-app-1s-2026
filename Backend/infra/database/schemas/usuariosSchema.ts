import { mysqlTable, int, varchar, float } from "drizzle-orm/mysql-core";
import { randomUUID } from "node:crypto";

export const usuarios = mysqlTable("usuarios", {
	id: varchar("id", { length: 36 })
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	nome: varchar("nome", { length: 255 }).notNull(),
	cpf: varchar("cpf", { length: 255 }).notNull().unique(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	senha: varchar("senha", { length: 255 }).notNull(),
	endereco: varchar("endereco", { length: 255 }).notNull(),
	telefone: varchar("telefone", { length: 11 }).notNull(),
	rep: float("rep", { precision: 4, scale: 2 }).notNull().default(0),
	saldo: float("saldo").notNull().default(0),
});

export const fotoUsuarios = mysqlTable("foto_usuarios", {
	id: varchar("id", { length: 36 })
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	url: varchar("url", { length: 255 }).notNull().unique(),

	usuarioId: varchar("usuario_id", { length: 36 })
		.references(() => usuarios.id, { onDelete: "cascade", onUpdate: "cascade" })
		.notNull(),
});
