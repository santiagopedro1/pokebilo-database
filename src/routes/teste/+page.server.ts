import type { PageServerLoad } from './$types';
import { populateDatabasePokemon, populateDatabaseTypes } from '$lib';

export const load = (async () => {
	// await populateDatabaseTypes();
	// await populateDatabasePokemon();
	return {};
}) satisfies PageServerLoad;
