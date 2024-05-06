import type { PageServerLoad } from './$types';

import { getBasicPokemonInfo, getAllTypesNames } from '$lib';

export const load: PageServerLoad = async () => {
	const allPokemon = await getBasicPokemonInfo();
	const allTypesNames = await getAllTypesNames();
	return { allPokemon, allTypesNames };
};
