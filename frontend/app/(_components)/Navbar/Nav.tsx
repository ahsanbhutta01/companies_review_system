"use client";

import { navigation } from "@/constant";
import { cn } from "@/lib/utils";
import { HelpCircle, MenuIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type navProps = {
	openNav: () => void;
};

const Nav = ({ openNav }: navProps) => {
	const pathname = usePathname();

	return (
		<div className='fixed left-0 top-0 right-0 bg-white border-b border-gray-200 z-50'>
			<section className='w-[90%] mx-auto'>
				<div className='flex justify-between items-center h-16'>
					{/* LOGO */}
					<Link href='/' className='flex items-center space-x-2'>
						<Image src='/favicon.svg' alt='B. Logo' width={34} height={34} />
						<div className='font-bold text-gray-900'>
							<span className='block sm:hidden text-sm'>
								Company <br /> Reviews
							</span>
							<span className='hidden sm:block sm:text-xl'>
								Company Reviews System
							</span>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<nav className='hidden lg:flex items-center space-x-1 lg:space-x-4'>
						{navigation.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"flex items-center space-x-1 px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors duration-200 whitespace-normal",
										isActive
											? "text-blue-600 bg-blue-50"
											: "text-gray-700 hover:text-blue-600",
									)}>
									{item.icon}
									<span>{item.name}</span>
								</Link>
							);
						})}
					</nav>

					{/* right side button */}
					<div className='flex items-center space-x-18 lg:space-x-4'>
						<Link
							href={"/want-to-know"}
							className='lg:flex hidden items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 w-full text-left'>
							<HelpCircle className='size-3 lg:size-4' />
							<span className='text-xs lg:text-sm font-medium whitespace-nowrap'>
								Want to know{" "}
							</span>
						</Link>
						<DecorativeShapes />
						<MenuIcon
							className='size-7 cursor-pointer lg:hidden'
							onClick={openNav}
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Nav;

function DecorativeShapes() {
	return (
		<div className=' lg:flex items-center ml-3 '>
			<div className='flex items-center space-x-2'>
				{/* First group with enhanced animations */}
				<div className='flex items-center space-x-1.5'>
					{/* Animated diamond shape */}
					<div
						className='size-3 rounded-sm bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45 shadow-md animate-bounce'
						style={{ animationDuration: "2s" }}></div>
					{/* Animated circle */}
					<div
						className='size-3 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-md animate-pulse'
						style={{ animationDuration: "3s" }}></div>
				</div>

				{/* Middle separator with subtle animation */}
				<div className='h-4 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-70 animate-pulse'></div>

				{/* Second group with enhanced animations */}
				<div className='flex items-center space-x-1.5'>
					{/* Animated diamond shape */}
					<div className='w-3 h-3 bg-gradient-to-br from-green-400 to-green-600 transform rotate-45 shadow-md animate-pulse'></div>
					{/* Animated circle with bounce */}
					<div
						className='w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-md animate-bounce'
						style={{ animationDuration: "1s" }}></div>
				</div>
			</div>
		</div>
	);
}
