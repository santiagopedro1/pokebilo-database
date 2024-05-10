import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const pokemonTypeSchema = sqliteTable('pokemonTypes', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	icon: text('icon').notNull(),
	damageRelations: text('damageRelations', { mode: 'json' })
		.$type<{
			offensive: {
				halfDamageTo: Array<number>;
				doubleDamageTo: Array<number>;
				noDamageTo: Array<number>;
			};
			defensive: {
				resists: Array<number>;
				weak: Array<number>;
				immune: Array<number>;
			};
		}>()
		.notNull()
});

export const pokemonSchema = sqliteTable('pokemon', {
	pokedexNumber: integer('pokedexNumber').primaryKey(),
	name: text('name').notNull(),
	genus: text('genus').notNull(),
	stats: text('stats', { mode: 'json' })
		.$type<{
			hp: number;
			attack: number;
			defense: number;
			specialAttack: number;
			specialDefense: number;
			speed: number;
		}>()
		.notNull(),
	type1: integer('type1')
		.references(() => pokemonTypeSchema.id)
		.notNull(),
	type2: integer('type2').references(() => pokemonTypeSchema.id),
	images: text('images', { mode: 'json' })
		.$type<{
			default: string;
			shiny: string;
		}>()
		.notNull()
});
