CREATE TABLE `usuarios` (
	`id` varchar(36) NOT NULL,
	`cpf` varchar(255) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`senha` varchar(255) NOT NULL,
	`cep` varchar(255) NOT NULL,
	`logradouro` varchar(255) NOT NULL,
	`bairro` varchar(255) NOT NULL,
	`numero` int NOT NULL,
	`uf` varchar(2) NOT NULL,
	`complemento` varchar(50) NOT NULL,
	`rep` float(4,2) NOT NULL,
	`saldo` float NOT NULL DEFAULT 0,
	CONSTRAINT `usuarios_id` PRIMARY KEY(`id`)
);
