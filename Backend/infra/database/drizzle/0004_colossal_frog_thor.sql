CREATE TABLE `foto_usuarios` (
	`id` varchar(36) NOT NULL,
	`url` varchar(255) NOT NULL,
	`usuario_id` varchar(36) NOT NULL,
	CONSTRAINT `foto_usuarios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `foto_usuarios` ADD CONSTRAINT `foto_usuarios_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE cascade ON UPDATE cascade;