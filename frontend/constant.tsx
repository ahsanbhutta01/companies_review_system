import { Briefcase, FileText, PenTool } from "lucide-react";
import Image from "next/image";

export const navigation = [
	{
		name: "Home",
		href: "/",
		icon: (
			<Image
				src='/favicon.svg'
				alt='Home'
				width={16}
				height={16}
				className='lg:size-4 size-3'
			/>
		),
	},
	{
		name: "Shared Story",
		href: "/share-story",
		icon: <PenTool className='size-3 lg:size-4' />,
	},
	{ name: "Reviews", href: "/reviews", icon: <FileText className='size-3 lg:size-4' /> },
	{
		name: "Companies",
		href: "/companies",
		icon: <Briefcase className='size-3 lg:size-4' />,
	},
	{ name: "Blog", href: "/blog", icon: <FileText className='size-3 lg:size-4' /> },
];
