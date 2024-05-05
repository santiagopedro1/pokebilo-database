import { db, pokemonSchema, pokemonTypeSchema } from '$lib/db';

import Pokedex from 'pokedex-promise-v2';
import { eq, type InferSelectModel } from 'drizzle-orm';

export const getCompletePokemonInfo = async () => {
	const pokemon = await db
		.select({ pokedexNumber: pokemonSchema.pokedexNumber, name: pokemonSchema.name, typing: pokemonSchema.typing, image: pokemonSchema.images })
		.from(pokemonSchema);
	const types = await db.select().from(pokemonTypeSchema);

	const pokemonWithTypes = pokemon.map((pokemon) => {
		const image = pokemon.image.default;
		const typing = pokemon.typing.map((typeId) => {
			const type = types.find((type) => type.typeId === typeId);
			return type!.typeName;
		});
		return { ...pokemon, typing, image };
	});

	return pokemonWithTypes;
};

export const getBasicPokemonInfo = async () => {
	const pokemon = await db
		.select({ pokedexNumber: pokemonSchema.pokedexNumber, name: pokemonSchema.name, typing: pokemonSchema.typing, image: pokemonSchema.images })
		.from(pokemonSchema);

	const types = await db.select().from(pokemonTypeSchema);

	const pokemonWithImages = pokemon.map((pokemon) => {
		const image = pokemon.image.default;
		const typing = pokemon.typing.map((typeId) => {
			const type = types.find((type) => type.typeId === typeId);
			return type!.typeName;
		});
		return { ...pokemon, image, typing };
	});

	return pokemonWithImages;
};

export const getPokemonByNameOrId = async (searchParam: number | string) => {
	const searchParamNumber = typeof searchParam === 'string' ? parseInt(searchParam) : searchParam;

	if (!isNaN(searchParamNumber)) {
		const resultPokemon = await db.select().from(pokemonSchema).where(eq(pokemonSchema.pokedexNumber, searchParamNumber));

		if (resultPokemon.length === 0) {
			return null;
		} else {
			const allTypes = await db.select().from(pokemonTypeSchema);
			const typing = resultPokemon[0].typing.map((typeId) => {
				return allTypes.find((type) => type.typeId === typeId)!;
			});

			return { ...resultPokemon[0], typing };
		}
	} else if (typeof searchParam === 'string') {
		const resultPokemon = await db.select().from(pokemonSchema).where(eq(pokemonSchema.name, searchParam));

		if (resultPokemon.length === 0) {
			return null;
		} else {
			const allTypes = await db.select().from(pokemonTypeSchema);
			const typing = resultPokemon[0].typing.map((typeId) => {
				return allTypes.find((type) => type.typeId === typeId)!;
			});

			return { ...resultPokemon[0], typing };
		}
	} else {
		return null;
	}
};

export const getAllTypes = async () => {
	const allTypes = await db.select().from(pokemonTypeSchema);
	return allTypes;
};

export const getAllTypesNames = async () => {
	const allTypes = await db.select().from(pokemonTypeSchema);
	return allTypes.map((type) => type.typeName);
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
		const typing = pokebilo.types.map((type) => +type.type.url.split('/').slice(-2)[0]) as [number, number];
		const images = {
			default: await fetchImageAndConvertToBase64(pokebilo.sprites.other['official-artwork'].front_default || ''),
			shiny: await fetchImageAndConvertToBase64(pokebilo.sprites.other['official-artwork'].front_shiny || '')
		};

		pokemon.push({
			pokedexNumber,
			name,
			genus,
			stats,
			typing,
			images
		});
	}

	await db.insert(pokemonSchema).values(pokemon);
};
