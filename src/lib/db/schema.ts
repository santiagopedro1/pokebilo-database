import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

const pokemonTypes = sqliteTable('pokemonTypes', {
	typeId: integer('id').primaryKey(),
	typeName: text('name').notNull(),
	typeEfficaciesAgainstThisType: text('type_efficacies_against_this_type', { mode: 'json' })
		.$type<
			Array<{
				damageTypeId: number;
				damageFactor: number;
			}>
		>()
		.notNull()
});

const pokemon = sqliteTable('pokemon', {
	pokedexNumber: integer('pokedex_number').primaryKey(),
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
	typing: text('typing', { mode: 'json' }).$type<[number] | [number, number]>().notNull(),
	images: text('images', { mode: 'json' })
		.$type<{
			default: string;
			shiny: string;
		}>()
		.notNull()
});

export { pokemonTypes, pokemon };
