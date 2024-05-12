<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	export let title: string;
	export let description: string;
	export let headerBg: Array<string>;
	export let size: 'default' | 'lg' = 'default';

	const typeGradient: { [key: string]: Array<string> } = {
		normal: ['from-types-normal', 'to-types-normal'],
		fighting: ['from-types-fighting', 'to-types-fighting'],
		flying: ['from-types-flying', 'to-types-flying'],
		poison: ['from-types-poison', 'to-types-poison'],
		ground: ['from-types-ground', 'to-types-ground'],
		rock: ['from-types-rock', 'to-types-rock'],
		bug: ['from-types-bug', 'to-types-bug'],
		ghost: ['from-types-ghost', 'to-types-ghost'],
		steel: ['from-types-steel', 'to-types-steel'],
		fire: ['from-types-fire', 'to-types-fire'],
		water: ['from-types-water', 'to-types-water'],
		grass: ['from-types-grass', 'to-types-grass'],
		electric: ['from-types-electric', 'to-types-electric'],
		psychic: ['from-types-psychic', 'to-types-psychic'],
		ice: ['from-types-ice', 'to-types-ice'],
		dragon: ['from-types-dragon', 'to-types-dragon'],
		dark: ['from-types-dark', 'to-types-dark'],
		fairy: ['from-types-fairy', 'to-types-fairy']
	};
</script>

<Card.Root class="space-y-8 border-none text-white {size === 'lg' ? 'col-span-2' : ''}">
	<Card.Header
		class="rounded-t-lg bg-gradient-to-r {headerBg.length > 1
			? `${typeGradient[headerBg[0]][0]} ${typeGradient[headerBg[1]][1]}`
			: `${typeGradient[headerBg[0]][0]} ${typeGradient[headerBg[0]][1]}`}"
	>
		<Card.Title class="text-3xl font-extrabold">{title}</Card.Title>
		<Card.Description class="text-white">{description}</Card.Description>
	</Card.Header>
	<Card.Content class="grid items-center rounded-b-lg">
		<slot></slot>
	</Card.Content>
</Card.Root>
