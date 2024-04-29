import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

const pokemonTypes = sqliteTable('pokemonTypes', {
	typeId: integer('id').primaryKey(),
	typeName: text('name').notNull(),
	damageRelations: text('damage_relations', { mode: 'json' })
		.$type<{
			no_damage_to: Array<number> | undefined;
			half_damage_to: Array<number> | undefined;
			double_damage_to: Array<number> | undefined;
			no_damage_from: Array<number> | undefined;
			half_damage_from: Array<number> | undefined;
			double_damage_from: Array<number> | undefined;
		}>()
		.notNull()
});

const pokemon = sqliteTable('pokemon', {
	pokedexNumber: integer('pokedex_number').primaryKey(),
	name: text('name').notNull(),
	type1: integer('type1')
		.references(() => pokemonTypes.typeId)
		.notNull(),
	type2: integer('type2').references(() => pokemonTypes.typeId)
});

export { pokemonTypes, pokemon };
