import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

import { getPokemonSpeciesList } from '$lib';

export const GET: RequestHandler = async () => {
	const pokemonSpeciesList = await getPokemonSpeciesList();
	return json(pokemonSpeciesList);
};
