import { text, integer, sqliteTable, blob } from 'drizzle-orm/sqlite-core';

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
	image: blob('image').notNull(),
	type1: integer('type1')
		.references(() => pokemonTypes.typeId)
		.notNull(),
	type2: integer('type2').references(() => pokemonTypes.typeId)
});

export { pokemonTypes, pokemon };
