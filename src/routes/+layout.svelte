<script>
	import { ScrollArea } from '$lib/components/ui/scroll-area/';
	import '../app.pcss';
</script>

<ScrollArea class="h-screen w-screen">
	<div class="grid place-items-center px-8">
		<header class="grid place-items-center py-4">
			<a href="/">
				<img
					src="/pokebiloHub.png"
					alt=""
					class="w-44"
				/>
			</a>
		</header>
		<hr class="w-full" />
		<main class="space-y-8 rounded-lg bg-background px-4 py-4">
			<slot></slot>
		</main>
	</div>
</ScrollArea>
