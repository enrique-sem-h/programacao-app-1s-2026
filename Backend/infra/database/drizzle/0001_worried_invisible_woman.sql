CREATE TABLE `anuncios` (
	`id` varchar(36) NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descricao` varchar(255) NOT NULL,
	`categoria` varchar(255) NOT NULL,
	`valor_diario` float NOT NULL,
	`caucao` float NOT NULL,
	`usuario_id` varchar(36) NOT NULL,
	CONSTRAINT `anuncios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `foto_anuncio` (
	`id` varchar(36) NOT NULL,
	`url` varchar(255) NOT NULL,
	`ordem` int NOT NULL,
	`principal` boolean NOT NULL DEFAULT false,
	`anuncio_id` varchar(36) NOT NULL,
	CONSTRAINT `foto_anuncio_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `anuncios` ADD CONSTRAINT `anuncios_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `foto_anuncio` ADD CONSTRAINT `foto_anuncio_anuncio_id_anuncios_id_fk` FOREIGN KEY (`anuncio_id`) REFERENCES `anuncios`(`id`) ON DELETE no action ON UPDATE no action;