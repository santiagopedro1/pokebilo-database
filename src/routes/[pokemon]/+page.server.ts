import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

import { getPokemonByName, getTypeList } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
	const { species, pokemon } = await getPokemonByName(params.pokemon);
	const typeList = await getTypeList();
	if (!pokemon || !species) {
		return error(404, { message: 'Pokemon not found' });
	} else {
		return { species, pokemon, typeList };
	}
};
