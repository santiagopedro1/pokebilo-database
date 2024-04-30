// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	type PokemonType =
		| 'normal'
		| 'fire'
		| 'water'
		| 'electric'
		| 'grass'
		| 'ice'
		| 'fighting'
		| 'poison'
		| 'ground'
		| 'flying'
		| 'psychic'
		| 'bug'
		| 'rock'
		| 'ghost'
		| 'dragon'
		| 'dark'
		| 'steel'
		| 'fairy';
}

export {};
