<script lang="ts">
	import DamageEff from '$lib/components/DamageEff.svelte';
	import PokemonHero from '$lib/components/PokemonHero.svelte';
	import PokemonSectionCard from '$lib/components/PokemonSectionCard.svelte';
	import PokemonStats from '$lib/components/PokemonStats.svelte';

	import * as Select from '$lib/components/ui/select';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { species, pokemon, typeList } = data;

	const forms = pokemon.map((p) => {
		return {
			value: p.formName,
			label: p.displayName
		};
	});

	let currentForm = pokemon[0];
</script>

<div class="grid place-items-center">
	<Select.Root
		items={forms}
		selected={forms[0]}
		onSelectedChange={(v) => {
			if (v) {
				const form = pokemon.find((p) => p.formName === v.value);
				if (form) currentForm = form;
			}
		}}
	>
		<Select.Trigger class="w-1/2 text-lg capitalize">
			<Select.Value placeholder="Theme" />
		</Select.Trigger>
		<Select.Content class="max-h-56 overflow-y-scroll">
			{#each forms as form}
				<Select.Item
					value={form.value}
					class="text-lg capitalize"
				>
					{form.label}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>

<PokemonHero
	pokedexNumber={species.pokedexNumber}
	name={currentForm.displayName}
	type1={{ name: currentForm.type1.name, icon: currentForm.type1.icon }}
	type2={currentForm.type2 ? { name: currentForm.type2.name, icon: currentForm.type2.icon } : null}
	images={{ default: currentForm.defaultImage, shiny: currentForm.shinyImage }}
	category={species.category}
/>

<div class="grid grid-cols-2 gap-4">
	<PokemonSectionCard
		title="Stats"
		description="Base stats of this Pokémon"
		headerBg={currentForm.type2 ? [currentForm.type1.name, currentForm.type2.name] : [currentForm.type1.name]}
	>
		<PokemonStats stats={currentForm.stats} />
	</PokemonSectionCard>

	<PokemonSectionCard
		title="Alguma coisa"
		description="Alguma coisa of this Pokémon"
		headerBg={currentForm.type2 ? [currentForm.type1.name, currentForm.type2.name] : [currentForm.type1.name]}
	>
		<p>sei la</p>
	</PokemonSectionCard>

	<PokemonSectionCard
		title="Type effectiveness"
		description="How effective are different types of moves against this Pokémon"
		headerBg={currentForm.type2 ? [currentForm.type1.name, currentForm.type2.name] : [currentForm.type1.name]}
		size="lg"
	>
		<DamageEff
			pokemonType={[currentForm.type1, currentForm.type2]}
			{typeList}
		/>
	</PokemonSectionCard>
</div>
<!-- #c87d37
#7b8c42
#b13d3d
#5e8a94
#a4617d
#94631d
#5f7e6a
#9a6e27
#536f85
#9d4e9d -->
<div class="flex gap-4">
	<div class="size-80 bg-[#c87d37]"></div>
	<div class="size-80 bg-[#7b8c42]"></div>
	<div class="size-80 bg-[#b13d3d]"></div>
	<div class="size-80 bg-[#5e8a94]"></div>
	<div class="size-80 bg-[#a4617d]"></div>
	<div class="size-80 bg-[#94631d]"></div>
	<div class="size-80 bg-[#5f7e6a]"></div>
	<div class="size-80 bg-[#9a6e27]"></div>
	<div class="size-80 bg-[#536f85]"></div>
	<div class="size-80 bg-[#9d4e9d]"></div>
</div>
