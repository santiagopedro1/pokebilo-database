<script>
	import '../app.pcss';
</script>

<div class="bg-green-500 p-2">
	<header class="flex items-center justify-center">
		<a href="/">
			<img
				src="/pokepedia.png"
				alt=""
				class="w-52"
			/>
		</a>
	</header>
	<main class="min-h-screen space-y-8 rounded-lg bg-background px-8 py-4">
		<slot></slot>
	</main>
</div>
