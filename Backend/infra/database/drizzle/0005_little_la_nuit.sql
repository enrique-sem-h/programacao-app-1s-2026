CREATE TABLE `alugueis` (
	`id` varchar(36) NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'pendente',
	`valor_total` float NOT NULL,
	`caucao` float NOT NULL,
	`data_inicio` varchar(10) NOT NULL,
	`data_fim` varchar(10) NOT NULL,
	`stripe_payment_intent_id` varchar(255),
	`metodo_pagamento` varchar(50),
	`locatario_id` varchar(36) NOT NULL,
	`anuncio_id` varchar(36) NOT NULL,
	`criado_em` timestamp DEFAULT (now()),
	CONSTRAINT `alugueis_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `alugueis` ADD CONSTRAINT `alugueis_locatario_id_usuarios_id_fk` FOREIGN KEY (`locatario_id`) REFERENCES `usuarios`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alugueis` ADD CONSTRAINT `alugueis_anuncio_id_anuncios_id_fk` FOREIGN KEY (`anuncio_id`) REFERENCES `anuncios`(`id`) ON DELETE cascade ON UPDATE no action;