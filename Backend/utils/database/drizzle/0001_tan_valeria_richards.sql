ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_cpf_unique` UNIQUE(`cpf`);--> statement-breakpoint
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_email_unique` UNIQUE(`email`);