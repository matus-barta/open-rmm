<script>
	const year = new Date().getFullYear();
</script>

<div class="bg-gray-500 w-screen h-8 px-2 text-sm flex flex-wrap content-center text-green-300">
	<span class="px-2">©{year} Open RMM</span>
	<a class="footerLink" href="/attributions">Attributions</a>
	<a class="flex items-center space-x-1 footerLink" href="https://github.com/matus-barta/Open_RMM">
		<div class="flex-shrink-0">
			<img class="h-4 w-4" src="/GitHub-Mark.svg" alt="github logo" />
		</div>
		<div>Github</div>
	</a>
</div>

<style lang="postcss">
	.footerLink {
		@apply px-2 hover:text-green-200;
	}
</style>
