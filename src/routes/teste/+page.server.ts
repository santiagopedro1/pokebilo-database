import type { PageServerLoad } from './$types';

import { populateDatabasePokemon, populateDatabaseTypes } from '$lib';

export const load: PageServerLoad = async () => {
	// await populateDatabaseTypes();
	// await populateDatabasePokemon();
};
