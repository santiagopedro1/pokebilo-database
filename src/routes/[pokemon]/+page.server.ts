import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

import { getPokemonByName, getAllTypesBasicInfo } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
	const pokemon = await getPokemonByName(params.pokemon);
	const allTypesBasicInfo = await getAllTypesBasicInfo();
	if (!pokemon) {
		return error(404, { message: 'Pokemon not found' });
	} else {
		return { pokemon, allTypesBasicInfo };
	}
};
