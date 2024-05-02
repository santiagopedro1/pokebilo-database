import { db } from './client';
import * as schema from './schema';

export const getAllPokemon = async () => {
	const pokemons = await db.select().from(schema.pokemon);
	const types = await db.select().from(schema.pokemonTypes);

	return pokemons.map((pokemon) => {
		const type1 = types.find((type) => type.typeId === pokemon.type1);
		const type2 = types.find((type) => type.typeId === pokemon.type2);

		if (!type1) throw new Error(`Type with id ${pokemon.type1} not found`);
		return { ...pokemon, type1, type2: type2 ? type2 : null };
	});
};

export const getAllTypes = async () => {
	const allTypes = await db.select().from(schema.pokemonTypes);
	return allTypes;
};

export { db, schema };
