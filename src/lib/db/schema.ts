import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const pokemonType = sqliteTable('pokemonType', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	iconUrl: text('iconUrl').notNull(),
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

export const pokemonSpecies = sqliteTable('pokemonSpecies', {
	pokedexNumber: integer('pokedexNumber').primaryKey(),
	name: text('name').notNull(),
	category: text('category').notNull()
});

export const pokemon = sqliteTable('pokemon', {
	id: integer('id').primaryKey(),
	speciesId: integer('speciesId')
		.references(() => pokemonSpecies.pokedexNumber)
		.notNull(),
	displayName: text('displayName').notNull(),
	formName: text('formName').notNull(),
	isDefault: integer('isDefault', { mode: 'boolean' }).notNull(),
	height: integer('height').notNull(),
	weight: integer('weight').notNull(),
	type1: integer('type1')
		.references(() => pokemonType.id)
		.notNull(),
	type2: integer('type2').references(() => pokemonType.id),
	stats: text('stats', { mode: 'json' })
		.$type<
			Array<{
				name: string;
				baseStat: number;
				evYield: number;
			}>
		>()
		.notNull(),
	defaultImageUrl: text('defaultImageUrl').notNull(),
	shinyImageUrl: text('shinyImageUrl').notNull()
});
