import { navigation } from "@/constant";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MobileNavProps{
  showNav: boolean;
  closeNav: ()=>void
}

const MobileNav = ({showNav,closeNav}: MobileNavProps) => {

  const navOpen = showNav ? "translate-x-0":"translate-x-[-200%]"

	return (
		<div>
			{/* Overlay */}
			<section 
      className={cn(
        'fixed top-0 inset-0 transform transition-all duration-500 z-[100002] bg-black opacity-70 w-full h-screen',
        navOpen
      )} />

      {/* Navlinks */}
			<section 
        className={cn(
          'text-white top-0 fixed justify-center flex flex-col h-full   transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-gray-900 space-y-6 z-[1000050]',
          navOpen
        )}
      >
				{navigation.map((link) => {
					return (
						<Link onClick={closeNav} href={link.href} key={link.name}>
							<p className='text-white w-fit text-2xl ml-12 border-b-[1.5px] pb-2 border-white sm:text-[30px]'>
								{link.name}
							</p>
						</Link>
					);
				})}

        <Link 
          href='/want-to-know' 
          onClick={closeNav} 
          className="text-white w-fit text-2xl ml-12 border-b-[1.5px] pb-2 sm:text-[30px]"
        >
          <span className="text-xl font-medium whitespace-nowrap">Want to Know</span>
        </Link>

        {/* Close Icon */}
        <X 
          className="absolute top-[0.7rem] right-[1.4rem] sm:size-8 size-6"
          onClick={closeNav}
        />
			</section>



		</div>
	);
};

export default MobileNav;
