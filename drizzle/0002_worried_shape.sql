ALTER TABLE `pokemon` RENAME COLUMN `pokedex_number` TO `pokedexNumber`;--> statement-breakpoint
ALTER TABLE `pokemon` RENAME COLUMN `image` TO `images`;--> statement-breakpoint
ALTER TABLE `pokemonTypes` RENAME COLUMN `damage_relations` TO `damageRelations`;--> statement-breakpoint
/*
 SQLite does not support "Changing existing column type" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE pokemon ADD `genus` text NOT NULL;--> statement-breakpoint
ALTER TABLE pokemon ADD `stats` text NOT NULL;--> statement-breakpoint
ALTER TABLE pokemonTypes ADD `icon` text NOT NULL;