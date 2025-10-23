"use client";

import { cn } from "@/lib/utils";
import { Review } from "@/type";
import { Calendar, ChevronsDown, ChevronsUp, User } from "lucide-react";
import React, { useState } from "react";

type ReviewProps = {
	review: Review;
};

const ReviewCard = ({ review }: ReviewProps) => {
	const [isExpanded, setIsExpended] = useState(false);
	const maxLength = 150;
	const shouldShowMore = review?.story?.length > maxLength;

	function getVibeColor(vibe: string) {
		switch (vibe) {
			case "positive":
				return "text-green-700 bg-green-100 border-green-200";
			case "negative":
				return "text-red-700 bg-red-100 border-red-200";
			default:
				return "text-yellow-700 bg-yellow-100 border-yellow-200";
		}
	}

	const displayContent =
		shouldShowMore && !isExpanded
			? review?.story?.substring(0, maxLength) + "..."
			: review.story;

	return (
		<div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200 cursor-pointer'>
			{/* Header */}
			<section className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0'>
				<div className='flex-1'>
					<div className='flex flex-wrap items-center space-x-3 mb-3'>
						<h3 className='sm:text-xl text-lg font-bold text-gray-900'>
							{review?.companyName}
						</h3>
						<span
							className={cn(
								"px-3 py-1 text-sm font-medium rounded-full border",
								getVibeColor(review?.vibe),
							)}>
							{review?.vibe}
						</span>
					</div>
				</div>
			</section>

			{/* Review Title */}
			<h4 className='sm:text-lg text-base font-semibold text-gray-800 mb-4 leading-relaxed'>
				{review?.title}
			</h4>

			{/* Review content */}
			<section className='mb-6'>
				<p className='text-gray-700 text-sm sm:text-base leading-relaxed'>
					{displayContent}
				</p>
				{shouldShowMore && (
					<button
						onClick={() => setIsExpended(!isExpanded)}
						className='mt-4 flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-semibold transition-colors text-sm sm:text-base cursor-pointer'>
						<span>{isExpanded ? "See Less" : "See More"}</span>
						{isExpanded ? (
							<ChevronsUp className='size-5' />
						) : (
							<ChevronsDown className='size-5' />
						)}
					</button>
				)}
			</section>

			{/* footer */}
			<section className='flex sm:flex-row flex-col sm:items-center sm:justify-between pt-4 border-t border-gray-100 space-y-2 sm:space-y-px'>
				<div className='flex items-center space-x-2 text-gray-600'>
					<User className='size-4' />
					<span className='font-medium text-sm sm:text-base'>
						{review?.name || review?.anonymousId}
					</span>
				</div>
				<div className='flex items-center text-sm sm:text-base space-x-1 text-gray-500 '>
					<Calendar className='size-4' />
					<span>
						{new Date(review?.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
				</div>
			</section>

         {/* Helpful actions */}
         <section className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
               <div className="hidden sm:flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                     <span className="text-sm">👍</span>
                     <span className="text-sm font-medium ">Helpfull</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                     <span className="text-sm">🚩</span>
                     <span className="text-sm font-medium ">Report</span>
                  </button>
               </div>
               <button className="text-blue-600 hover:text-blue-700 cursor-pointer">View Company Profile</button>
            </div>
         </section>
		</div>
	);
};

export default ReviewCard;
