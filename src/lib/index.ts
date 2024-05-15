import { db, pokemon, pokemonSpecies, pokemonType } from '$lib/db';

import Pokedex from 'pokedex-promise-v2';
import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';

export const getPokemonSpeciesList = async () => {
	const pt1 = alias(pokemonType, 'pt1');
	const pt2 = alias(pokemonType, 'pt2');

	const pokemonList: Array<PokemonSpeciesData> = (await db
		.select({
			pokedexNumber: pokemonSpecies.pokedexNumber,
			name: pokemonSpecies.name,
			defaultImage: pokemon.defaultImage,
			type1: {
				id: pt1.id,
				name: pt1.name,
				icon: pt1.icon
			},
			type2: {
				id: pt2.id,
				name: pt2.name,
				icon: pt2.icon
			}
		})
		.from(pokemonSpecies)
		.leftJoin(pokemon, eq(pokemon.speciesId, pokemonSpecies.pokedexNumber))
		.leftJoin(pt1, eq(pokemon.type1, pt1.id))
		.leftJoin(pt2, eq(pokemon.type2, pt2.id))
		.where(eq(pokemon.isDefault, true))) as Array<PokemonSpeciesData>;

	return pokemonList;
};

export const getPokemonByName = async (name: string) => {
	const species = await db
		.select({ pokedexNumber: pokemonSpecies.pokedexNumber, category: pokemonSpecies.category })
		.from(pokemonSpecies)
		.where(eq(pokemonSpecies.name, name));

	const allPokemon = await db
		.select({
			displayName: pokemon.displayName,
			formName: pokemon.formName,
			isDefault: pokemon.isDefault,
			isMega: pokemon.isMega,
			type1: pokemon.type1,
			type2: pokemon.type2,
			stats: pokemon.stats,
			defaultImage: pokemon.defaultImage,
			shinyImage: pokemon.shinyImage
		})
		.from(pokemon)
		.where(eq(pokemon.speciesId, species[0].pokedexNumber));

	const pokemonWithTypes = await Promise.all(
		allPokemon.map(async (p) => {
			const type1 = await db.select().from(pokemonType).where(eq(pokemonType.id, p.type1));
			const type2 = p.type2 ? await db.select().from(pokemonType).where(eq(pokemonType.id, p.type2)) : null;

			return {
				...p,
				type1: type1[0],
				type2: type2 ? type2[0] : null
			};
		})
	);

	return {
		species: species[0],
		pokemon: pokemonWithTypes
	};
};

export const getTypeList = async () => {
	const types = await db.select({ id: pokemonType.id, name: pokemonType.name, icon: pokemonType.icon }).from(pokemonType);
	return types;
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

export const populateDatabasePokemon = async () => {
	const P = new Pokedex();

	const maxPokemon = 151;

	await db.delete(pokemon);
	await db.delete(pokemonSpecies);

	for (let i = 1; i <= maxPokemon; i++) {
		const species = await P.getPokemonSpeciesByName(i);

		await db.insert(pokemonSpecies).values({
			pokedexNumber: i,
			name: species.name,
			category: species.genera.find((g) => g.language.name === 'en')?.genus || ''
		});

		console.log(`\n\nInserted species ${species.name}`);

		for (const item of species.varieties) {
			// skip the bullshit pikachu forms
			if (i === 25 && item.pokemon.name !== 'pikachu' && item.pokemon.name !== 'pikachu-gmax') {
				console.log('Skipping form', item.pokemon.name);
				continue;
			}

			const pokemonF = await P.getPokemonByName(item.pokemon.name);
			const form = await P.getPokemonFormByName(item.pokemon.name);

			const id = form.id;
			const speciesId = i;
			const displayName = !item.is_default ? form.names.find((n) => n.language.name === 'en')?.name.toLowerCase() || '' : species.name;
			const formName = !item.is_default ? form.form_names.find((n) => n.language.name === 'en')?.name.toLowerCase() || '' : species.name;
			const isDefault = item.is_default;
			const isMega = form.is_mega;
			const type1 = parseInt(pokemonF.types[0].type.url.split('/').slice(-2)[0]);
			const type2 = pokemonF.types[1] ? parseInt(pokemonF.types[1].type.url.split('/').slice(-2)[0]) : null;
			const stats = [
				{ name: 'HP', baseStat: pokemonF.stats[0].base_stat, evYield: pokemonF.stats[0].effort },
				{ name: 'Attack', baseStat: pokemonF.stats[1].base_stat, evYield: pokemonF.stats[1].effort },
				{ name: 'Defense', baseStat: pokemonF.stats[2].base_stat, evYield: pokemonF.stats[2].effort },
				{ name: 'Sp. Attack', baseStat: pokemonF.stats[3].base_stat, evYield: pokemonF.stats[3].effort },
				{ name: 'Sp. Defense', baseStat: pokemonF.stats[4].base_stat, evYield: pokemonF.stats[4].effort },
				{ name: 'Speed', baseStat: pokemonF.stats[5].base_stat, evYield: pokemonF.stats[5].effort }
			];
			const defaultImage = pokemonF.sprites.other['official-artwork'].front_default
				? await fetchImageAndConvertToBase64(pokemonF.sprites.other['official-artwork'].front_default)
				: '';
			const shinyImage = pokemonF.sprites.other['official-artwork'].front_shiny
				? await fetchImageAndConvertToBase64(pokemonF.sprites.other['official-artwork'].front_shiny)
				: '';

			try {
				await db.insert(pokemon).values({
					id,
					speciesId,
					displayName,
					formName,
					isDefault,
					isMega,
					type1,
					type2,
					stats,
					defaultImage,
					shinyImage
				});
				console.log(`\nInserted form ${item.pokemon.name}`);
			} catch (error) {
				console.error(error);
			}
		}
	}
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
	await db.insert(pokemonType).values(typesWithBase64);
};
