import { db } from './client';
import * as schema from './schema';

export const asd = async () => {
	const pokemons = await db.select().from(schema.pokemon);
	const types = await db.select().from(schema.pokemonTypes);

	// change the type in pokemon to be the type name
	return pokemons.map((pokemon) => {
		const type1 = types.find((type) => type.typeId === pokemon.type1);
		const type2 = types.find((type) => type.typeId === pokemon.type2);
		return { ...pokemon, type1: type1 ? type1.typeName : null, type2: type2 ? type2.typeName : null };
	});
};

export { db, schema };
