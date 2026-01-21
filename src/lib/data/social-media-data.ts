import { LinkedinIcon, GithubIcon, ZapIcon, MailIcon } from '@lucide/svelte';
import type { Component } from 'svelte';

export type SocialMediaItem = {
	title: string;
	href: string;
	icon: Component;
};

const socialMediaData: SocialMediaItem[] = [
	{
		title: 'Github',
		href: 'https://github.com/atadanicen',
		icon: GithubIcon
	},
	{
		title: 'LinkedIn',
		href: 'https://linkedin.com/in/atadanicen',
		icon: LinkedinIcon
	},
	{
		title: 'Lightning AI',
		href: 'https://lightning.ai/atadanicen',
		icon: ZapIcon
	},
	{
		title: 'Mail',
		href: 'mailto:atadanicen@gmail.com',
		icon: MailIcon
	}
];

export default socialMediaData;
