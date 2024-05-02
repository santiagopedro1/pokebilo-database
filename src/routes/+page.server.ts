import type { PageServerLoad } from './$types';

import { getAllPokemon } from '$lib/db';

export const load: PageServerLoad = async () => {
	const allPokemon = await getAllPokemon();
	if (allPokemon) {
		return { allPokemon };
	}
};
