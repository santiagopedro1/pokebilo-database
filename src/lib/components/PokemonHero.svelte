<script lang="ts">
	import TypeBadge from '$lib/components/TypeBadge.svelte';

	import { Toggle } from '$lib/components/ui/toggle/';

	export let poke: {
		name: string;
		paddedPokedexNumber: string;
		typing: { typeName: string; typeId: number; typeEfficaciesAgainstThisType: { damageTypeId: number; damageFactor: number }[] }[];
		images: { default: string; shiny: string };
		genus: string;
	};

	const { name, paddedPokedexNumber, typing, images, genus } = poke;

	let shiny = false;
</script>

<div class="grid w-full grid-cols-2 place-items-center">
	<div>
		<img
			src={shiny ? images.shiny : images.default}
			alt={'An image of the pokemon ' + name}
		/>
		<div class="flex justify-center gap-8">
			{#each typing as { typeName }}
				<TypeBadge
					variant="lg"
					type={typeName}
				/>
			{/each}
		</div>
	</div>
	<div class="grid w-full place-items-center gap-4 justify-self-start">
		<div class="grid items-center">
			<h1 class="text-6xl font-extrabold uppercase">{name}</h1>
			<span class="text-center text-gray-400">#{paddedPokedexNumber}</span>
		</div>
		<h2 class="text-2xl">The {genus}</h2>
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
</div>

<!-- <h2>Base stats:</h2>
		{#each Object.entries(stats) as [name, value]}
			<div class="grid w-full grid-cols-[15ch_1fr_max-content] gap-4">
				<p class="justify-self-end"><span class="text-lg font-bold">{statNameMap.get(name)}:</span> {value}</p>
				<Slider
					value={[value]}
					max={255}
					step={1}
				/>
			</div>
		{/each} -->

<!-- const statNameMap = new Map([
			['hp', 'HP'],
			['attack', 'Attack'],
			['defense', 'Defense'],
			['specialAttack', 'Sp. Atk'],
			['specialDefense', 'Sp. Def'],
			['speed', 'Speed']
		]); -->
