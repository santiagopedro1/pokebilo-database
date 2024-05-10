// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { pokemonSchema, pokemonTypeSchema } from '$lib/db';
import { InferSelectModel } from 'drizzle-orm';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface BasicPokemonInfo {
		pokedexNumber: number;
		name: string;
		type1: number;
		type2: number | null;
		image: string;
	}

	interface CompletePokemonInfo extends Pokemon {
		type1: PokemonType;
		type2: PokemonType | null;
	}

	interface TypeBasicInfo {
		id: number;
		name: string;
		icon: string;
	}

	type Pokemon = InferSelectModel<typeof pokemonSchema>;
	type PokemonType = InferSelectModel<typeof pokemonTypeSchema>;
}

export {};
