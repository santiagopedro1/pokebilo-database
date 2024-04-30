CREATE TABLE `pokemon` (
	`pokedex_number` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type1` integer NOT NULL,
	`type2` integer,
	FOREIGN KEY (`type1`) REFERENCES `pokemonTypes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`type2`) REFERENCES `pokemonTypes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pokemonTypes` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`damage_relations` text NOT NULL
);
