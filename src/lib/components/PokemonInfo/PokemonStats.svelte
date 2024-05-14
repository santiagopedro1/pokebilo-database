<script lang="ts">
	import { Slider } from '$lib/components/ui/slider/';
	export let stats: Array<Pokemon['stats'][number]>;
</script>

<div class="grid grid-cols-[max-content_3ch_auto] place-items-center gap-4">
	{#each stats as { name, baseStat, evYield }}
		<div class="justify-self-end font-extrabold">{name}</div>
		<div>{baseStat}</div>
		<Slider
			value={[baseStat]}
			max={255}
			disabled
			{evYield}
		/>
	{/each}
</div>
