ALTER TABLE `anuncios` DROP FOREIGN KEY `anuncios_usuario_id_usuarios_id_fk`;
--> statement-breakpoint
ALTER TABLE `anuncios` ADD CONSTRAINT `anuncios_usuario_id_usuarios_id_fk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE cascade ON UPDATE cascade;