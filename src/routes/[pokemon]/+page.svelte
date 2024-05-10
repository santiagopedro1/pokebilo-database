<script lang="ts">
	import DamageEff from '$lib/components/DamageEff.svelte';
	import PokemonHero from '$lib/components/PokemonHero.svelte';
	import PokemonSectionCard from '$lib/components/PokemonSectionCard.svelte';
	import PokemonStats from '$lib/components/PokemonStats.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { pokemon, allTypesBasicInfo } = data;
	const { type1, type2, stats } = pokemon;
</script>

<PokemonHero {pokemon} />

<div class="grid grid-cols-2 gap-4">
	<PokemonSectionCard
		title="Stats"
		description="Base stats of this Pokémon"
		headerBg={type2 ? [type1.name, type2.name] : [type1.name]}
	>
		<PokemonStats {stats} />
	</PokemonSectionCard>

	<PokemonSectionCard
		title="Alguma coisa"
		description="Alguma coisa of this Pokémon"
		headerBg={type2 ? [type1.name, type2.name] : [type1.name]}
	>
		<p>sei la</p>
	</PokemonSectionCard>

	<PokemonSectionCard
		title="Type effectiveness"
		description="How effective are different types of moves against this Pokémon"
		headerBg={type2 ? [type1.name, type2.name] : [type1.name]}
		size="lg"
	>
		<DamageEff
			pokemonType={[type1, type2]}
			{allTypesBasicInfo}
		/>
	</PokemonSectionCard>
</div>
