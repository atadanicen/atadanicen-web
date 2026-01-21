export type NavbarItem = {
	title: string;
	href: string;
};

const navbarData: NavbarItem[] = [
	{
		title: 'About',
		href: '#about'
	},
	{
		title: 'Projects',
		href: '#projects'
	},
	{
		title: 'Contact',
		href: 'mailto:atadanicen@gmail.com'
	}
];

export default navbarData;
