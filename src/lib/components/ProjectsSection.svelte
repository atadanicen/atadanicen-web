<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import projectsData from '$lib/data/project-data';
	import type { ProjectItem } from '$lib/data/project-data';
	import { ExternalLinkIcon, GithubIcon, ImageOffIcon, XIcon } from '@lucide/svelte';
	import Button from './ui/button/button.svelte';
</script>

<section
	id="projects"
	class="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 sm:px-6 lg:px-8"
>
	<h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">Selected Works & Impact</h2>

	<p
		class="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground dark:text-muted-foreground/80"
	>
		A collection of projects, tools, and experiments driven by curiosity and practical
		problem-solving — spanning independent products and open-source contributions.
	</p>

	<div class="mt-20 grid grid-cols-1 gap-y-24 md:grid-cols-2 md:gap-x-16 xl:grid-cols-3">
		{#each projectsData as project}
			{@render ProjectCard(project)}
		{/each}
	</div>
</section>

{#snippet ProjectCard(project: ProjectItem)}
	<Card.Root
		class="group w-full rounded-none border-none bg-transparent shadow-none transition-all duration-500"
	>
		<Card.Header class="p-0">
			{#if project.image}
				<div class="flex h-60 w-full items-center justify-center bg-muted/20">
					<img
						src={project.image}
						alt={project.title}
						class="max-h-full max-w-full object-contain"
					/>
				</div>
			{:else}
				<div class="flex h-60 w-full items-center justify-center bg-muted/20">
					<XIcon class="m-auto h-12 w-12 text-muted-foreground/50" />
				</div>
			{/if}

			<div class="space-y-3 px-1">
				<div class="flex items-center justify-between pt-2">
					<Card.Title
						class="text-center text-xl font-medium text-foreground/90 group-hover:text-foreground"
					>
						{project.title}
					</Card.Title>
					<div class="flex h-6 items-center gap-2 text-muted-foreground/70">
						{#if project.githubUrl}
							<Button
								href={project.githubUrl}
								target="_blank"
								title={project.title + ' GitHub'}
								variant="ghost"
							>
								<GithubIcon class="size-6 hover:text-foreground" />
							</Button>{/if}

						{#if project.liveUrl}<Button
								href={project.liveUrl}
								target="_blank"
								title={project.title + ' Demo'}
								variant="ghost"
							>
								<ExternalLinkIcon class="size-6 hover:text-foreground" />
							</Button>{/if}
					</div>
				</div>

				<Card.Description
					class="max-w-prose text-sm leading-relaxed font-light text-muted-foreground italic md:text-base"
				>
					{project.description}
				</Card.Description>
			</div>
		</Card.Header>

		<Card.Content class="mt-8 p-0 px-1">
			<ul class="space-y-4">
				{#each project.bulletpoints as point}
					<li
						class="relative pl-4 text-sm leading-relaxed text-foreground transition-colors before:absolute before:top-[0.6em] before:left-0 before:h-px before:w-2 before:bg-muted-foreground/30"
					>
						{point}
					</li>
				{/each}
			</ul>
		</Card.Content>

		<Card.Footer class="mt-10 p-0 px-1">
			<div class="flex flex-wrap gap-x-4 gap-y-2">
				{#each project.techStack as tech}
					<span
						class="text-[10px] tracking-widest text-muted-foreground uppercase group-hover:text-foreground"
					>
						{tech}
					</span>
				{/each}
			</div>
		</Card.Footer>
	</Card.Root>
{/snippet}
