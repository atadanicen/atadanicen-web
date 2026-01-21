<script lang="ts">
	import socialMediaData from '$lib/data/social-media-data';
	import { Button } from './ui/button';
</script>

<div
	class="flex flex-col items-center gap-2 border-t border-border bg-background p-4 md:flex-row md:justify-between"
>
	<p class="text-sm text-muted-foreground">
		&copy; {new Date().getFullYear()} Atadan Icen.
	</p>
	<div class="flex items-center gap-4">
		{#each socialMediaData as item}
			<Button variant="ghost" href={item.href} size="icon" target="_blank" title={item.title}>
				<svelte:component this={item.icon} />
			</Button>
		{/each}
	</div>
</div>
