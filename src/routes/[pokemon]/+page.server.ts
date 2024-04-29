import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

import { getAllPokemonAndTypes } from '$lib/db';

export const load: PageServerLoad = async ({ params }) => {
	const allPokemon = await getAllPokemonAndTypes();

	const pokemon = allPokemon.find((pokemon) => pokemon.name.toLowerCase() === params.pokemon);

	if (!pokemon) {
		return error(404, { message: 'Pokemon not found' });
	} else {
		return { pokemon };
	}
};
