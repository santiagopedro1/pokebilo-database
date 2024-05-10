import { db, pokemonSchema, pokemonTypeSchema } from '$lib/db';

import Pokedex from 'pokedex-promise-v2';
import { eq, type InferSelectModel } from 'drizzle-orm';

export const getAllPokemon = async () => {
	const pokemon = await db.select().from(pokemonSchema);
	return pokemon;
};

export const getPokemonByName = async (searchParam: string) => {
	const pokemon = await db.select().from(pokemonSchema).where(eq(pokemonSchema.name, searchParam));
	const types = await db.select().from(pokemonTypeSchema);

	if (pokemon.length === 0) {
		return null;
	}

	const type1 = types.find((type) => type.id === pokemon[0].type1);
	const type2 = types.find((type) => type.id === pokemon[0].type2) || null;

	return {
		...pokemon[0],
		type1: type1!,
		type2: type2
	};
};

export const getAllTypes = async () => {
	const allTypes = await db.select().from(pokemonTypeSchema);
	return allTypes;
};

export const getAllTypesBasicInfo = async () => {
	const allTypes = await db
		.select({ id: pokemonTypeSchema.id, name: pokemonTypeSchema.name, icon: pokemonTypeSchema.icon })
		.from(pokemonTypeSchema);
	return allTypes;
};

async function fetchImageAndConvertToBase64(url: string) {
	const response = await fetch(url);
	const buffer = await response.arrayBuffer();

	const base64Flag = 'data:image/png;base64,';
	const imageStr = arrayBufferToBase64(buffer);

	return base64Flag + imageStr;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
	let binary = '';
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

// add Pokémon to the database
export const populateDatabasePokemon = async () => {
	const P = new Pokedex();

	const maxPokemon = 151;

	const pokemon: Array<InferSelectModel<typeof pokemonSchema>> = [];

	for (let i = 1; i <= maxPokemon; i++) {
		const pokebilo = await P.getPokemonByName(i);
		const pokebiloSpecies = await P.getPokemonSpeciesByName(i);

		const name = pokebilo.name;
		const pokedexNumber = pokebilo.id;
		const genus = pokebiloSpecies.genera.find((genus) => genus.language.name === 'en')!.genus;
		const stats = {
			hp: pokebilo.stats[0].base_stat,
			attack: pokebilo.stats[1].base_stat,
			defense: pokebilo.stats[2].base_stat,
			specialAttack: pokebilo.stats[3].base_stat,
			specialDefense: pokebilo.stats[4].base_stat,
			speed: pokebilo.stats[5].base_stat
		};
		const typing = {
			type1: parseInt(pokebilo.types[0].type.url.split('/').slice(-2)[0]),
			type2: pokebilo.types[1] ? parseInt(pokebilo.types[1].type.url.split('/').slice(-2)[0]) : null
		};
		const images = {
			default: await fetchImageAndConvertToBase64(pokebilo.sprites.other['official-artwork'].front_default || ''),
			shiny: await fetchImageAndConvertToBase64(pokebilo.sprites.other['official-artwork'].front_shiny || '')
		};

		pokemon.push({
			pokedexNumber,
			name,
			genus,
			stats,
			...typing,
			images
		});
	}

	await db.insert(pokemonSchema).values(pokemon);
};

const urls = [
	'https://archives.bulbagarden.net/media/upload/thumb/a/ae/Normal_icon.png/40px-Normal_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/7/7d/Fighting_icon.png/40px-Fighting_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/f/f0/Flying_icon.png/40px-Flying_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/8/84/Poison_icon.png/40px-Poison_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/5/58/Ground_icon.png/40px-Ground_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/f/ff/Rock_icon.png/40px-Rock_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/7/79/Bug_icon.png/40px-Bug_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/8/82/Ghost_icon.png/40px-Ghost_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/b/b8/Steel_icon.png/40px-Steel_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/5/5e/Fire_icon.png/40px-Fire_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/7/7f/Water_icon.png/40px-Water_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/c/cb/Grass_icon.png/40px-Grass_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/a/af/Electric_icon.png/40px-Electric_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/a/a6/Psychic_icon.png/40px-Psychic_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/8/83/Ice_icon.png/40px-Ice_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/9/91/Dragon_icon.png/40px-Dragon_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/3/33/Dark_icon.png/40px-Dark_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/5/5a/Fairy_icon.png/40px-Fairy_icon.png'
];

export const populateDatabaseTypes = async () => {
	const p = new Pokedex();
	const allTypes = [];
	for (let i = 1; i <= 18; i++) {
		const type = await p.getTypeByName(i);
		const resists = type.damage_relations.half_damage_from.map((t) => parseInt(t.url.split('/').slice(-2)[0]));
		const weak = type.damage_relations.double_damage_from.map((t) => parseInt(t.url.split('/').slice(-2)[0]));
		const immune = type.damage_relations.no_damage_from.map((t) => parseInt(t.url.split('/').slice(-2)[0]));
		const halfDamageTo = type.damage_relations.half_damage_to.map((t) => parseInt(t.url.split('/').slice(-2)[0]));
		const doubleDamageTo = type.damage_relations.double_damage_to.map((t) => parseInt(t.url.split('/').slice(-2)[0]));
		const noDamageTo = type.damage_relations.no_damage_to.map((t) => parseInt(t.url.split('/').slice(-2)[0]));

		allTypes.push({
			id: i,
			name: type.name,
			damageRelations: {
				offensive: {
					halfDamageTo,
					doubleDamageTo,
					noDamageTo
				},
				defensive: {
					resists,
					weak,
					immune
				}
			}
		});
	}

	// change the icon to a base64 string
	const typesWithBase64 = await Promise.all(
		allTypes.map(async (type) => {
			const b = await fetchImageAndConvertToBase64(urls[type.id - 1]);
			return { ...type, icon: b };
		})
	);
	await db.insert(pokemonTypeSchema).values(typesWithBase64);
};
