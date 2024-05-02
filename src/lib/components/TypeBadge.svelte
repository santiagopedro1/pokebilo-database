<script lang="ts">
	import { Badge } from './ui/badge';

	export let type: string;
	export let size: 'sm' | 'lg' = 'sm';
</script>

<Badge class="{size === 'lg' ? 'w-48 text-lg' : 'w-28 text-sm'} {type} flex items-center justify-center gap-1 py-1 capitalize">
	<img
		src={'/' + type + '.png'}
		alt={type + ' type'}
		class={size === 'lg' ? ' h-8 w-8' : 'h-6 w-6'}
	/>
	{type}
</Badge>
