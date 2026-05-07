ALTER TABLE `usuarios` ADD `endereco` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `cep`;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `logradouro`;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `bairro`;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `numero`;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `uf`;--> statement-breakpoint
ALTER TABLE `usuarios` DROP COLUMN `complemento`;