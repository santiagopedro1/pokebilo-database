<script lang="ts">
	import { Hero, SectionCard, Stats, TypeEff } from '$lib/components/PokemonInfo';

	import { Label } from '$lib/components/ui/label/';
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

{#if pokemon.length > 1}
	<div class="flex items-center justify-center gap-4">
		<Label class="text-2xl font-bold">Varieties</Label>
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
			<Select.Trigger class="w-96 text-lg capitalize">
				<Select.Value placeholder="Theme" />
			</Select.Trigger>
			<Select.Content>
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
{/if}

<Hero
	pokedexNumber={species.pokedexNumber}
	name={currentForm.displayName}
	type1={{ name: currentForm.type1.name, icon: currentForm.type1.icon }}
	type2={currentForm.type2 ? { name: currentForm.type2.name, icon: currentForm.type2.icon } : null}
	images={{ default: currentForm.defaultImage, shiny: currentForm.shinyImage }}
	category={species.category}
/>

<div class="grid grid-cols-2 gap-4">
	<SectionCard
		title="Stats"
		description="Base stats of this Pokémon"
		headerBg={currentForm.type2 ? [currentForm.type1.name, currentForm.type2.name] : [currentForm.type1.name]}
	>
		<Stats stats={currentForm.stats} />
	</SectionCard>

	<SectionCard
		title="Alguma coisa"
		description="Alguma coisa of this Pokémon"
		headerBg={currentForm.type2 ? [currentForm.type1.name, currentForm.type2.name] : [currentForm.type1.name]}
	>
		<p>sei la</p>
	</SectionCard>

	<SectionCard
		title="Type effectiveness"
		description="How effective are different types of moves against this Pokémon"
		headerBg={currentForm.type2 ? [currentForm.type1.name, currentForm.type2.name] : [currentForm.type1.name]}
		size="lg"
	>
		<TypeEff
			pokemonType={[currentForm.type1, currentForm.type2]}
			{typeList}
		/>
	</SectionCard>
</div>
