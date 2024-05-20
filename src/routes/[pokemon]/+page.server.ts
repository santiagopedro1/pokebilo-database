import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

import { getCompleteSpeciesData, getTypeList } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
	const completeSpeciesData = await getCompleteSpeciesData(params.pokemon);
	const typeList = await getTypeList();
	return {
		completeSpeciesData,
		typeList
	};
};
