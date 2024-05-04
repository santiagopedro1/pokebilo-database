import { db } from './client';
import * as schema from './schema';

import { eq } from 'drizzle-orm';

const { pokemon, pokemonTypes } = schema;

export const getAllPokemon = async () => {
	const pokemons = await db
		.select({ pokedexNumber: pokemon.pokedexNumber, name: pokemon.name, typing: pokemon.typing, image: pokemon.images })
		.from(pokemon);
	const types = await db.select().from(pokemonTypes);

	const pokemonsWithTypes = pokemons.map((pokemon) => {
		const image = pokemon.image.default;
		const typing = pokemon.typing.map((typeId) => {
			const type = types.find((type) => type.typeId === typeId);
			return type!.typeName;
		});
		return { ...pokemon, typing, image };
	});

	return pokemonsWithTypes;
};

export const getPokemonByNameOrId = async (searchParam: number | string) => {
	// if searchParam is a string, parse it to a number first
	const searchParamNumber = typeof searchParam === 'string' ? parseInt(searchParam) : searchParam;

	// if searchParamNumber is not nan (meaning it is a number), search by pokedexNumber
	if (!isNaN(searchParamNumber)) {
		const resultPokemon = await db.select().from(pokemon).where(eq(pokemon.pokedexNumber, searchParamNumber));

		if (resultPokemon.length === 0) {
			return null;
		} else {
			const allTypes = await db.select().from(pokemonTypes);
			// for all the values in pokemon.typing, substitute the typeId with the type
			const typing = resultPokemon[0].typing.map((typeId) => {
				return allTypes.find((type) => type.typeId === typeId)!;
			});

			return { ...resultPokemon[0], typing };
		}
	} else if (typeof searchParam === 'string') {
		const resultPokemon = await db.select().from(pokemon).where(eq(pokemon.name, searchParam));

		if (resultPokemon.length === 0) {
			return null;
		} else {
			const allTypes = await db.select().from(pokemonTypes);
			// for all the values in pokemon.typing, substitute the typeId with the type
			const typing = resultPokemon[0].typing.map((typeId) => {
				return allTypes.find((type) => type.typeId === typeId)!;
			});

			return { ...resultPokemon[0], typing };
		}
	} else {
		return null;
	}
};

export const getAllTypes = async () => {
	const allTypes = await db.select().from(pokemonTypes);
	return allTypes;
};

export { db, schema };
