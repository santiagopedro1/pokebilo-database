import type { PageServerLoad } from './$types';

import { getAllPokemon } from '$lib/db';

export const load: PageServerLoad = async () => {
	const pokemons = await getAllPokemon();
	if (pokemons) {
		return { pokemons };
	}
};
