export interface NavItem {
	label: string
	subLabel?: string
	children?: Array<NavItem>
	href?: string
}

export const NavItems: Array<NavItem> = [
	{
		label: 'Category 1',
		children: [
			{
				label: 'label 1',
				subLabel: 'sublabel 1',
				href: '#',
			},
			{
				label: 'label 2',
				subLabel: 'sublabel 2',
				href: '#',
			},
		],
	},
	{
		label: 'Category 2',
		children: [
			{
				label: 'label 1',
				subLabel: 'sublabel 1',
				href: '#',
			},
			{
				label: 'label 2',
				subLabel: 'sublabel 2',
				href: '#',
			},
		],
	},
	{
		label: 'Category 3',
		href: '#',
	},
	{
		label: 'Category 4',
		href: '#',
	},
]
