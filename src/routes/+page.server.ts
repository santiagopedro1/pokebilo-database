import type { PageServerLoad } from './$types';

import { getAllPokemon, getAllTypes } from '$lib';

export const load: PageServerLoad = async () => {
	const allPokemon = await getAllPokemon();
	const allTypes = await getAllTypes();
	return { allPokemon, allTypes };
};
