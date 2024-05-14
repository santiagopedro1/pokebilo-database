import type { PageServerLoad } from './$types';

import { getTypeList, populateDatabasePokemon } from '$lib';

export const load: PageServerLoad = async () => {
	// await populateDatabasePokemon();
	const pokemonTypeList = await getTypeList();
	return { pokemonTypeList };
};
