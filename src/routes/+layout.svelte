<script>
	import '../app.pcss';
</script>

<div class="space-y-4 px-8 py-4">
	<header class="grid place-items-center">
		<a href="/">
			<img
				src="/pokebiloHub.png"
				alt="Logo for pokebiloHub"
				class="w-44"
			/>
		</a>
	</header>
	<hr class="w-full" />
</div>
<main class="grid min-h-screen place-items-center gap-8 p-4">
	<slot></slot>
</main>
