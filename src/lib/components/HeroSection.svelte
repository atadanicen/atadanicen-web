<script>
	import socialMediaData from '$lib/data/social-media-data';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import { MoveDown, MoveDownIcon } from '@lucide/svelte';
	import Button from './ui/button/button.svelte';
	import VideoText from './VideoText.svelte';

	const isMobile = new IsMobile();
</script>

<div class="flex min-h-[75vh] flex-col gap-8 pt-48" id="about">
	<div class="flex flex-col items-center justify-center gap-8">
		<img
			src="src/lib/assets/atadanicen.jpeg"
			alt="atadanicen"
			class="size-52 object-cover duration-300 hover:-rotate-3"
		/>

		<div class="flex w-full flex-col justify-center">
			<div class="relative h-20 w-full overflow-hidden">
				<VideoText
					src="src/lib/assets/horses.webm"
					content="Atadan Icen"
					fontSize={isMobile.current ? '60' : '80'}
				></VideoText>
			</div>
			<p class="text-center text-xl text-muted-foreground">
				Ex-Jotform | Full-Stack Engineer & AI Engineer.
			</p>
		</div>
		<!-- <h1 class="max-w-2xl text-center text-3xl font-semibold tracking-tight text-pretty lg:text-4xl">
			Building Intelligence through <span class="text-primary italic">Constant Refinement.</span>
		</h1> -->

		<div class="flex items-center gap-4">
			{#each socialMediaData as item}
				<Button variant="ghost" href={item.href} target="_blank" title={item.title}>
					<svelte:component this={item.icon} class="size-6" />
				</Button>
			{/each}
		</div>
		<div class="pt-8">
			<MoveDownIcon class="size-6 animate-bounce text-muted-foreground" />
		</div>
	</div>
</div>
