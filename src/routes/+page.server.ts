import type { PageServerLoad } from './$types';

import { getTypeList, getPokemonSpeciesList } from '$lib';

export const load: PageServerLoad = async () => {
	const pokemonTypeList = await getTypeList();
	const pokemonSpeciesListPromise = getPokemonSpeciesList();
	return { pokemonTypeList, pokemonSpeciesListPromise };
};
