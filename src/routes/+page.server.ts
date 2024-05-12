import type { PageServerLoad } from './$types';

import { getPokemonSpeciesList, getTypeList } from '$lib';

export const load: PageServerLoad = async () => {
	const pokemonSpeciesList = await getPokemonSpeciesList();
	const pokemonTypeList = await getTypeList();

	return { pokemonSpeciesList, pokemonTypeList };
};
