import type { PageServerLoad } from './$types';

import { populateDatabasePokemon, populateDatabaseTypes } from '$lib/db/populateDB';

export const load: PageServerLoad = async () => {
	// await populateDatabaseTypes();
	await populateDatabasePokemon();
};
