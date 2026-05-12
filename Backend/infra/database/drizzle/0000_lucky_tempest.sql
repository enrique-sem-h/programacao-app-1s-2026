CREATE TABLE `usuarios` (
	`id` varchar(36) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`cpf` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`senha` varchar(255) NOT NULL,
	`endereco` varchar(255) NOT NULL,
	`telefone` varchar(11) NOT NULL,
	`rep` float(4,2) NOT NULL DEFAULT 0,
	`saldo` float NOT NULL DEFAULT 0,
	CONSTRAINT `usuarios_id` PRIMARY KEY(`id`),
	CONSTRAINT `usuarios_cpf_unique` UNIQUE(`cpf`),
	CONSTRAINT `usuarios_email_unique` UNIQUE(`email`)
);
