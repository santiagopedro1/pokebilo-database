import type { PageServerLoad } from './$types';

import { getBasicPokemonInfo } from '$lib';

export const load: PageServerLoad = async () => {
	const allPokemon = await getBasicPokemonInfo();
	if (allPokemon) {
		return { allPokemon };
	}
};
