import type { PageServerLoad } from './$types';

import { getPokemonSpeciesList, getTypeList, populateDatabasePokemon } from '$lib';

export const load: PageServerLoad = async () => {
	// await populateDatabasePokemon();
	const pokemonSpeciesList = await getPokemonSpeciesList();
	const pokemonTypeList = await getTypeList();

	return { pokemonSpeciesList, pokemonTypeList };
};
