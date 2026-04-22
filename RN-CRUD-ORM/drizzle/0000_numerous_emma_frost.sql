CREATE TABLE `uf` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`abbreviation` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uf_name_unique` ON `uf` (`name`);
--> statement-breakpoint
CREATE UNIQUE INDEX `uf_abbreviation_unique` ON `uf` (`abbreviation`);
--> statement-breakpoint
CREATE TABLE `city` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`uf_id` text NOT NULL,
	FOREIGN KEY (`uf_id`) REFERENCES `uf`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `region` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`city_id` text NOT NULL,
	FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON UPDATE cascade ON DELETE cascade
);