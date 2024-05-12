// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { pokemon, pokemonSpecies, pokemonType } from '$lib/db';
import { InferSelectModel } from 'drizzle-orm';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type PokemonSpecies = InferSelectModel<typeof pokemonSpecies>;
	type Pokemon = InferSelectModel<typeof pokemon>;
	type PokemonType = InferSelectModel<typeof pokemonType>;

	type PokemonSpeciesData = Omit<PokemonSpecies, 'category'> & {
		defaultImage: string;
		type1: BasicPokemonTypeData;
		type2: BasicPokemonTypeData | null;
	};

	type CompletePokemonData = Omit<Pokemon, 'type1' | 'type2'> & {
		type1: PokemonType;
		type2: PokemonType | null;
	};

	type BasicPokemonTypeData = Omit<PokemonType, 'damageRelations'>;
}

export {};
