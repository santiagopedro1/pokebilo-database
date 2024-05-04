import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

import { getPokemonByNameOrId } from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
	const pokemon = await getPokemonByNameOrId(params.pokemon);

	if (!pokemon) {
		return error(404, { message: 'Pokemon not found' });
	} else {
		return { pokemon };
	}
};
