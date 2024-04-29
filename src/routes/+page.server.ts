import type { PageServerLoad } from './$types';

import { asd } from '$lib/db';

export const load: PageServerLoad = async () => {
	const pokemons = await asd();
	if (pokemons) {
		return { pokemons };
	}
};
