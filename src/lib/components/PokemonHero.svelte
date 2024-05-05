<script lang="ts">
	import TypeBadge from '$lib/components/TypeBadge.svelte';
	import { Sparkles } from 'lucide-svelte';

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

<div class="grid w-full grid-cols-2 place-items-center gap-8">
	<div class="justify-self-end">
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
	<div class="grid w-max place-items-center gap-4 justify-self-start">
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
			<Sparkles
				class="h-14 w-11 text-white group-hover:fill-yellow-500 group-hover:text-yellow-500 {shiny && 'fill-yellow-500 text-yellow-500'}"
			/>
		</Toggle>
	</div>
</div>
