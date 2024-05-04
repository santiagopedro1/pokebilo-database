import Pokedex from 'pokedex-promise-v2';
import { db, schema } from '.';

async function fetchImageAndConvertToBase64(url: string) {
	const response = await fetch(url);
	const buffer = await response.arrayBuffer();

	const base64Flag = 'data:image/png;base64,';
	const imageStr = arrayBufferToBase64(buffer);

	return base64Flag + imageStr;
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer) {
	let binary = '';
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}

const { pokemon } = schema;
const P = new Pokedex();

const maxPokemon = 100;

const pokemons: {
	pokedexNumber: number;
	name: string;
	genus: string;
	stats: {
		hp: number;
		attack: number;
		defense: number;
		specialAttack: number;
		specialDefense: number;
		speed: number;
	};
	typing: [number, number];
	images: {
		default: string;
		shiny: string;
	};
}[] = [];

for (let i = 10; i <= maxPokemon; i++) {
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

	const pokemon = {
		pokedexNumber,
		name,
		genus,
		stats,
		typing,
		images
	};

	pokemons.push(pokemon);
}

export const foda = async () => {
	await db.insert(pokemon).values(pokemons);
};
