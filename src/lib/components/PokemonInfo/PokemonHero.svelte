<script lang="ts">
	import TypeBadge from '$lib/components/TypeBadge.svelte';
	import { Sparkles } from 'lucide-svelte';

	import { Toggle } from '$lib/components/ui/toggle/';

	export let pokedexNumber: number;
	export let name: string;
	export let type1: { name: string; icon: string };
	export let type2: { name: string; icon: string } | null;
	export let images;
	export let category: string;

	let shiny = false;

	$: shiny = images.shiny && shiny;
</script>

<div class="grid w-full grid-cols-2 place-items-center gap-8">
	<div class="justify-self-end">
		<img
			src={shiny ? images.shiny : images.default}
			alt={'An image of the pokemon ' + name}
		/>
		<div class="flex justify-center gap-8">
			<TypeBadge
				type={type1}
				variant="lg"
			/>
			{#if type2}
				<TypeBadge
					type={type2}
					variant="lg"
				/>
			{/if}
		</div>
	</div>
	<div class="grid place-items-center gap-4 justify-self-center">
		<div class="grid items-center gap-2">
			<h1 class="text-wrap text-center text-6xl font-extrabold uppercase">{name}</h1>
			<span class="text-center italic text-gray-400">#{pokedexNumber.toString().padStart(4, '0')}</span>
		</div>
		<h2 class="text-2xl">The {category}</h2>
		{#if images.shiny}
			<Toggle
				aria-label="Toggle between shiny and default image"
				bind:pressed={shiny}
				class="group py-6"
			>
				<Sparkles class="size-11 group-hover:fill-yellow-500 group-hover:text-yellow-500 {shiny && 'fill-yellow-500 text-yellow-500'}" />
			</Toggle>
		{/if}
	</div>
</div>
