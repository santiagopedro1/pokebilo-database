<script lang="ts">
	import DamageEff from '$lib/components/DamageEff.svelte';
	import TypeBadge from '$lib/components/TypeBadge.svelte';

	import { Slider } from '$lib/components/ui/slider/';
	import { Toggle } from '$lib/components/ui/toggle/';

	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { pokemon } = data;
	const { name, pokedexNumber, typing, images, stats, genus } = pokemon;

	const paddedPokedexNumber = pokedexNumber.toString().padStart(3, '0');

	const statNameMap = new Map([
		['hp', 'HP'],
		['attack', 'Attack'],
		['defense', 'Defense'],
		['specialAttack', 'Sp. Atk'],
		['specialDefense', 'Sp. Def'],
		['speed', 'Speed']
	]);

	let shiny = false;
</script>

<div class="grid w-full grid-cols-[auto_450px] place-items-center">
	<div>
		<img
			src={shiny ? images.shiny : images.default}
			alt={'An image of the pokemon ' + name}
		/>
		<Toggle
			aria-label="Toggle between shiny and default image"
			bind:pressed={shiny}
			size="lg"
			class="group"
		>
			<!-- <svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				class=" h-14 w-11 text-yellow-500 transition-colors group-hover:fill-yellow-500 {shiny && 'fill-yellow-500'}"
				stroke="currentColor"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path
					d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"
				/></svg
			> -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-14 w-11 text-yellow-500 transition-all duration-300 group-hover:fill-yellow-500 {shiny && 'fill-yellow-500'}"
			>
				<path
					d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
				></path>
				<path d="M5 3v4"></path>
				<path d="M19 17v4"></path>
				<path d="M3 5h4"></path>
				<path d="M17 19h4"></path>
			</svg>
		</Toggle>
	</div>
	<div class="grid w-full place-items-center gap-4">
		<div class="flex items-center gap-3 text-3xl">
			<span class="text-gray-400">#{paddedPokedexNumber}</span>
			<h1 class="capitalize">{name}</h1>
		</div>
		<h2>The {genus}</h2>
		<div class="{typing.length === 1 ? 'grid-cols-1' : ' grid-cols-2'} grid gap-4">
			{#each typing as { typeName }}
				<TypeBadge
					variant="lg"
					type={typeName}
				/>
			{/each}
		</div>

		<h2>Base stats:</h2>
		{#each Object.entries(stats) as [name, value]}
			<div class="grid w-full grid-cols-[15ch_1fr_max-content] gap-4">
				<p class="justify-self-end"><span class="text-lg font-bold">{statNameMap.get(name)}:</span> {value}</p>
				<Slider
					value={[value]}
					max={255}
					step={1}
				/>
			</div>
		{/each}
	</div>
</div>

<div class="space-y-8">
	<h2 class="text-start text-3xl font-extrabold">Type effectiveness:</h2>
	<DamageEff {typing} />
</div>
