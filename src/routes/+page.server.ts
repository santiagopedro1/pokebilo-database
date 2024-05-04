import type { PageServerLoad } from './$types';

import { getAllPokemon } from '$lib/db';
// import { foda } from '$lib/db/helpers';

export const load: PageServerLoad = async () => {
	const allPokemon = await getAllPokemon();
	// await foda();
	if (allPokemon) {
		return { allPokemon };
	}
};
