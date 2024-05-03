<script lang="ts">
	import { Badge } from './ui/badge';

	export let type: string;
	export let variant: 'minimal' | 'md' | 'lg' = 'md';
</script>

{#if variant === 'minimal'}
	<Badge class="flex w-fit items-center justify-center gap-1 border-none py-1 text-lg capitalize">
		<img
			src={'/' + type + '.png'}
			alt={type + ' type'}
			width="24"
		/>
		{type}
	</Badge>
{:else}
	<Badge class="{variant === 'lg' ? 'w-48 text-lg' : 'w-28 text-sm'} {type} flex items-center justify-center gap-1 py-1 capitalize">
		{type}
	</Badge>
{/if}
