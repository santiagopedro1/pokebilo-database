<script lang="ts">
	import { Badge } from './ui/badge';

	export let type: PokemonType;
	export let size: 'sm' | 'lg' = 'sm';

	type = type.toLowerCase() as PokemonType;
</script>

<Badge class="{size === 'lg' ? 'text-lg' : ' text-sm'} {type} max-w-20 capitalize">{type}</Badge>
