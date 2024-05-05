<script lang="ts">
	import DamageEff from '$lib/components/DamageEff.svelte';
	import PokemonHero from '$lib/components/PokemonHero.svelte';
	import PokemonSectionCard from '$lib/components/PokemonSectionCard.svelte';
	import PokemonStats from '$lib/components/PokemonStats.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { pokemon } = data;
	const { name, pokedexNumber, typing, images, stats, genus } = pokemon;

	const paddedPokedexNumber = pokedexNumber.toString().padStart(3, '0');

	const poke = {
		name,
		paddedPokedexNumber,
		typing,
		images,
		genus
	};
</script>

<PokemonHero {poke} />

<div class="grid grid-cols-2 gap-4">
	<PokemonSectionCard
		title="Stats"
		description="Base stats of this Pokémon"
		headerBg={typing.length > 1 ? [typing[0].typeName, typing[1].typeName] : [typing[0].typeName]}
	>
		<PokemonStats {stats} />
	</PokemonSectionCard>

	<PokemonSectionCard
		title="Alguma coisa"
		description="Alguma coisa of this Pokémon"
		headerBg={typing.length > 1 ? [typing[0].typeName, typing[1].typeName] : [typing[0].typeName]}
	>
		<p>sei la</p>
	</PokemonSectionCard>

	<PokemonSectionCard
		title="Type effectiveness"
		description="How effective are different types of moves against this Pokémon"
		headerBg={typing.length > 1 ? [typing[0].typeName, typing[1].typeName] : [typing[0].typeName]}
		size="lg"
	>
		<DamageEff {typing} />
	</PokemonSectionCard>
</div>
