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

	interface BasicPokemonInfo {
		image: string;
		typing: Array<string>;
		pokedexNumber: number;
		name: string;
	}
}

export {};
