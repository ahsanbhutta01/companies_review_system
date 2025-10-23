import Link from "next/link";
import React from "react";

const Hero = () => {
	return (
		<div className='relative overflow-hidden w-full h-screen flex items-center justify-center flex-col'>

			<section className='px-4 sm:px-6 lg:px-8 py-24'>
            <div className="text-center">
               <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  All Institution
                  <span className="text-blue-600 block">Review Platform</span>
               </h1>
               <p className="sm:text-xl text-base mb-8 max-w-3xl mx-auto">
                  Share your experience with your favourite companies. Help others make informed decisions with authentic reviews and ratings from real customers. 
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                     href="/share-story"
                     className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 transition-colors duration-200 w-[70%] sm:w-[30%]"
                  >
                     Share Your Story
                  </Link>
                  <Link
                     href="/share-story"
                     className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 text-base font-medium rounded-md transition-colors duration-200 w-[70%] sm:w-[30%]"
                  >
                     Browse Reviews
                  </Link>
               </div>
            </div>
         </section>

		</div>
	);
};

export default Hero;
