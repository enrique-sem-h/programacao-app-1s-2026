CREATE TABLE `avaliacoes` (
	`id` varchar(36) NOT NULL,
	`aluguel_id` varchar(36) NOT NULL,
	`avaliador_id` varchar(36) NOT NULL,
	`estrelas` int NOT NULL,
	`comentario` varchar(500),
	`criado_em` timestamp DEFAULT (now()),
	CONSTRAINT `avaliacoes_id` PRIMARY KEY(`id`),
	CONSTRAINT `avaliacoes_aluguel_id_unique` UNIQUE(`aluguel_id`)
);
--> statement-breakpoint
ALTER TABLE `avaliacoes` ADD CONSTRAINT `avaliacoes_aluguel_id_alugueis_id_fk` FOREIGN KEY (`aluguel_id`) REFERENCES `alugueis`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `avaliacoes` ADD CONSTRAINT `avaliacoes_avaliador_id_usuarios_id_fk` FOREIGN KEY (`avaliador_id`) REFERENCES `usuarios`(`id`) ON DELETE cascade ON UPDATE no action;