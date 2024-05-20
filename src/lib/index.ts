import { db, pokemon, pokemonSpecies, pokemonType } from '$lib/db';

import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';

export const getPokemonSpeciesList = async () => {
	const pt1 = alias(pokemonType, 'pt1');
	const pt2 = alias(pokemonType, 'pt2');

	const pokemonList: Array<PokemonSpeciesData> = (await db
		.select({
			pokedexNumber: pokemonSpecies.pokedexNumber,
			name: pokemonSpecies.name,
			defaultImageUrl: pokemon.defaultImageUrl,
			type1: {
				name: pt1.name,
				iconUrl: pt1.iconUrl
			},
			type2: {
				name: pt2.name,
				iconUrl: pt2.iconUrl
			}
		})
		.from(pokemonSpecies)
		.leftJoin(pokemon, eq(pokemon.speciesId, pokemonSpecies.pokedexNumber))
		.leftJoin(pt1, eq(pokemon.type1, pt1.id))
		.leftJoin(pt2, eq(pokemon.type2, pt2.id))
		.where(eq(pokemon.isDefault, true))) as Array<PokemonSpeciesData>;

	return pokemonList;
};

export const getCompleteSpeciesData = async (name: string) => {
	// const completeData = await db
	// 	.select()
	// 	.from(pokemonSpecies)
	// 	.leftJoin(pokemon, eq(pokemon.speciesId, pokemonSpecies.pokedexNumber))
	// 	.where(eq(pokemonSpecies.name, name));
	// i want completeData to be {
	// species: {
	// 	species data
	// },
	// pokemon: [] an array of all the pokemon that belong to that species
	// }
	const pt1 = alias(pokemonType, 'pt1');
	const pt2 = alias(pokemonType, 'pt2');

	const speciesData = await db.select().from(pokemonSpecies).where(eq(pokemonSpecies.name, name)).get();

	if (!speciesData) throw new Error('Species not found');

	const pokemonData = (await db
		.select({
			displayName: pokemon.displayName,
			formName: pokemon.formName,
			height: pokemon.height,
			weight: pokemon.weight,
			type1: {
				...pt1
			},
			type2: {
				...pt2
			},
			stats: pokemon.stats,
			defaultImageUrl: pokemon.defaultImageUrl,
			shinyImageUrl: pokemon.shinyImageUrl
		})
		.from(pokemon)
		.leftJoin(pt1, eq(pokemon.type1, pt1.id))
		.leftJoin(pt2, eq(pokemon.type2, pt2.id))
		.where(eq(pokemon.speciesId, speciesData.pokedexNumber))) as Array<CompletePokemonData>;

	return { speciesData, pokemonData };
};

export const getTypeList = async () => {
	const types = await db.select({ id: pokemonType.id, name: pokemonType.name, iconUrl: pokemonType.iconUrl }).from(pokemonType);
	return types;
};
