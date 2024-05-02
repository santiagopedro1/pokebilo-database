<script lang="ts">
	export let type: 'weakness' | 'resistance' | 'immunity';
	export let value: string = '0';
	export let label: string;
</script>

<div class=" grid grid-cols-2 gap-0.5 rounded-md text-white">
	<div class="{label} grid place-items-center rounded-lg py-2">
		<p class="text-2xl font-bold capitalize">{label}</p>
	</div>
	<div
		class="{type === 'weakness'
			? 'bg-red-500'
			: type === 'resistance'
				? 'bg-green-500'
				: 'bg-gray-500'} flex items-center justify-center gap-0.5 rounded-lg"
	>
		<p class="text-2xl font-bold">{value}</p>
		<span class="font-bold">X</span>
	</div>
</div>
