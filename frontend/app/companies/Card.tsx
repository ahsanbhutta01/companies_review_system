"use client";

import { cn } from "@/lib/utils";
import { CompanyType } from "@/type";
import { TrendingDown, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";

type CardProps = {
	companies: CompanyType[];
};

const Card = ({ companies }: CardProps) => {
	// console.log(companies)
	const router = useRouter();

	function getComplaintRateColor(rate: number) {
		if (rate > 35) return "text-red-600 bg-red-50";
		if (rate > 25) return "text-yellow-600 bg-yellow-50";

		return "text-green-600 bg-green-50";
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
			{companies?.map((company, i) => (
				<div
					key={company._id}
					className='rounded-xl bg-white shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:bg-blue-50 group'>
					{/* Ranking Bage */}
					<section className='flex items-start justify-between mb-4'>
						<div className='flex items-center space-x-3'>
							<div
								className='flex items-center justify-center size-10 bg-gradient-to-br from-blue-50 to-purple-600 text-white rounded-full font-bold
                     '>
								{i + 1}
							</div>
						</div>
					</section>

					{/* Comapny Name */}
					<section className='mb-4'>
						<h3 className='text-xl font-bold text-gray-900 group-hover:text-blue-600'>
							{company?.name}
						</h3>
					</section>

					{/* Matrics grid */}
					<section className='grid grid-cols-2 gap-4 mb-4'>
						<div className='bg-gray-50 rounded-lg p-3'>
							<div className='flex items-center space-x-2 mb-1'>
								<Users className='size-4 text-blue-500' />
								<span className='text-xs font-medium text-gray-500 uppercase tracking-wide'>
									Total Reviews
								</span>
							</div>
							<p className='text-2xl font-bold text-gray-900'>
								{company?.totalReviews}
							</p>
						</div>
						<div
							className={cn(
								"rounded-lg p-3",
								getComplaintRateColor(company?.complaintRate),
							)}>
							<div className='flex items-center space-x-2 mb-1'>
								<TrendingDown className='size-4' />
								<span className='text-xs font-medium uppercase tracking-wide'>
									Complaint Rate
								</span>
							</div>
							<p className='text-2xl font-bold'>
								{company?.complaintRate?.toFixed(1)}%
							</p>
						</div>
					</section>

					{/* Review breakdown */}
					<section className='space-y-2'>
						{/* Positive */}
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-2'>
								<TrendingUp className='size-4 text-gray-500' />
								<span className='text-xs font-medium text-gray-700'>
									Positive
								</span>
							</div>
							<span className='text-sm font-bold text-gray-600'>
								{company.positiveCount}
							</span>
						</div>
						{/* Neutral */}
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-2'>
								<div className='size-4 bg-yellow-500 rounded-full' />
								<span className='text-xs font-medium text-gray-700'>Neutral</span>
							</div>
							<span className='text-sm font-bold text-yellow-600'>
								{company.neutralCount}
							</span>
						</div>
						{/* Negativ */}
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-2'>
								<TrendingDown className='size-4 text-red-500' />
								<span className='text-xs font-medium text-gray-700'>
									Negative
								</span>
							</div>
							<span className='text-sm font-bold text-red-600'>
								{company.negativeCount}
							</span>
						</div>
						{/* Progress bar */}
						<div className='mt-4'>
							<div className='flex justify-between text-sm text-gray-800 mb-1'>
								<span>Positive Ratio</span>
								<span>
									{company?.totalReviews > 0
										? `${(
												(company?.positiveCount / company?.totalReviews) *
												100
										  ).toFixed(1)}%`
										: "0.0%"}
								</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2'>
								<div
									className='bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500'
									style={{
										width:
											company.totalReviews > 0
												? `${
														(company?.positiveCount /
															company?.totalReviews) *
														100
												  }%`
												: "0%",
									}}></div>
							</div>
						</div>
					</section>

					{/* Action buttons */}
					<section
						className='mt-6 pt-4 border-t border-gray-100'
						onClick={() => router.push(`companies/${company?._id}`)}>
						<button
							className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px4
							rounded-lg font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer'>
							View Detail
						</button>
					</section>
				</div>
			))}
		</div>
	);
};

export default Card;
