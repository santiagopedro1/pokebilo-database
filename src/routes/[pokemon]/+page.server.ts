import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

import { getAllPokemon } from '$lib/db';
import { getAllTypes } from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
	const allPokemon = await getAllPokemon();
	const allTypes = await getAllTypes();

	const pokemon = allPokemon.find((p) => p.name === params.pokemon);

	if (!pokemon) {
		return error(404, { message: 'Pokemon not found' });
	} else {
		return { pokemon, allTypes };
	}
};
