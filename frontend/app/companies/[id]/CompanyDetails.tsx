"use client";

import ReviewCard from "@/app/(_components)/ReviewCard";
import { handleRequest } from "@/components/utils/apiRequest";
import { cn } from "@/lib/utils";
import { BASE_API_URL } from "@/server";
import { CompanyType } from "@/type";
import axios from "axios";
import { Building2, Loader, TrendingDown, TrendingUp, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
	id: string;
};
const CompanyDetails = ({ id }: Props) => {
	const [company, setCompany] = useState<CompanyType>();
	const [isLoading, setIsLoading] = useState(false);

	const total = company?.totalReviews || 0;
	const positivePercent =
		total === 0 ? 0 : ((company?.positiveCount || 0) / total) * 100;
	const neutralPercent = total === 0 ? 0 : ((company?.neutralCount || 0) / total) * 100;
	const negativePercent =
		total === 0 ? 0 : ((company?.negativeCount || 0) / total) * 100;

	function getComplaintRateColor(rate: number) {
		if (rate > 35) return "text-red-600 bg-red-50 border-red-200";
		if (rate > 25) return "text-yellow-600 bg-yellow-50 border-yellow-200";

		return "text-green-600 bg-green-50 border-green-200";
	}

	useEffect(() => {
		async function fetchCompanyById() {
			const companyDetailsReqById = async () =>
				await axios.get(`${BASE_API_URL}/companies/${id}`);
			const result = await handleRequest(companyDetailsReqById, setIsLoading);
			if (result) {
				setCompany(result?.data?.data?.company);
			}
		}
		fetchCompanyById();
	}, [id]);

	if (isLoading) {
		return (
			<div className='w-full h-screen flex items-center justify-center flex-col'>
				<Loader className='size-10 animate-spin' />
			</div>
		);
	}

	return (
		<div className='mt-[8rem] sm:w-[80%] w-full p-6 mx-auto'>
			{/* Bank name */}
			<section className='p-6 border-b border-gray-200'>
				<div className='flex items-center space-x-4'>
					<div className='flex items-center justify-center size-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl'>
						<Building2 className='size-6 ' />
					</div>
					<div>
						<h1 className='sm:text-2xl text-xl font-bold text-gray-900'>
							{company?.name}
						</h1>
					</div>
				</div>
			</section>

			{/* Content */}
			<section>
				<div className='mb-8 mt-8'>
					<h1 className='text-lg font-semibold text-gray-900 mb-4'>
						Key Performance metrics
					</h1>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
						{/* Total Reviews */}
						<div className='bg-blue-50 border-blue-200 rounded-lg p-4'>
							<div className='flex items-center space-x-2 mb-2'>
								<UserIcon className='size-5 text-blue-500' />
								<span className='text-sm font-medium text-blue-800'>
									Total Reviews
								</span>
							</div>
							<p className='text-2xl font-bold text-blue-900'>
								{company?.totalReviews}
							</p>
						</div>
						{/* Positive Reviews */}
						<div className='bg-green-50 border-green-200 rounded-lg p-4'>
							<div className='flex items-center space-x-2 mb-2'>
								<TrendingUp className='size-5 text-green-600' />
								<span className='text-sm font-medium text-green-800'>
									Positive Reviews
								</span>
							</div>
							<p className='text-2xl font-bold text-green-900'>
								{company?.positiveCount}
							</p>
							<p className='text-sm text-green-700'>{positivePercent}% of total</p>
						</div>
						{/* Neutral Reviews */}
						<div className='bg-yellow-50 border-yellow-200 rounded-lg p-4'>
							<div className='flex items-center space-x-2 mb-2'>
								<div className='size-5 bg-yellow-500 rounded-full' />
								<span className='text-sm font-medium text-yellow-800'>
									Neutral Reviews
								</span>
							</div>
							<p className='text-2xl font-bold text-yellow-900'>
								{company?.neutralCount}
							</p>
							<p className='text-sm text-yellow-700'>{neutralPercent}% of total</p>
						</div>
						{/* Negative Reviews */}
						<div className='bg-red-50 border-red-200 rounded-lg p-4'>
							<div className='flex items-center space-x-2 mb-2'>
								<TrendingDown className='size-5 text-red-600' />
								<span className='text-sm font-medium text-red-800'>
									Negative Reviews
								</span>
							</div>
							<p className='text-2xl font-bold text-red-900'>
								{company?.negativeCount}
							</p>
							<p className='text-sm text-red-700'>{negativePercent}% of total</p>
						</div>
					</div>
				</div>
				{/* Complaint Rate */}
				<div className='mb-8'>
					<h1 className='text-lg font-semibold text-gray-900 mb-4'>
						Complaint Rate Analysis
					</h1>
					<div
						className={cn(
							"rounded-lg p-6 border",
							getComplaintRateColor(company?.complaintRate || 0),
						)}>
						<div className='flex items-center justify-between mb-4'>
							<div>
								<p className='sm:text-3xl text-2xl font-bold'>
									{company?.complaintRate.toFixed(1)}%
								</p>
								<p className='text-sm font-medium'>Current Complaint Rate</p>
							</div>
							<div className='text-right'>
								<p className='sm:text-lg text-base font-semibold'>
									{(company?.complaintRate ?? 0) <= 20
										? "Excellent"
										: (company?.complaintRate ?? 0) <= 30
										? "Good"
										: (company?.complaintRate ?? 0) <= 40
										? "Fair"
										: "Need Improvement"}
								</p>
								<p className='text-sm'>Performance Rate</p>
							</div>
						</div>
						<div className='w-full bg-gray-200 rounded-full h-3 mb-2'>
							<div
								className={cn(
									"rounded-full transition-all duration-500 h-3 bg-red-700",
									(company?.complaintRate ?? 0) <= 20
										? "bg-green-500"
										: (company?.complaintRate ?? 0) <= 30
										? "bg-yellow-500"
										: "bg-red-500",
								)}
                        style={{
                           width: `${Math.min(company?.complaintRate ?? 0, 100)}%`
                        }}
								
							/>
						</div>
						<p className='text-xs text-gray-600'>
							Industry average : 20-35% | Excellent : &lt;20% | Good : 20-30% |
							Fair : 30-40%
						</p>
					</div>
				</div>
				{/* review distribution chart */}
				<div className='mb-8'>
					<h3 className='text-lg font-semibold text-gray-900 mb-4'>
						Review Distribution
					</h3>
					<div className='bg-gray-50 rounded-lg'>
						<div className='space-y-4'>
							{/* Positive Reviews */}
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-3'>
									<div className='size-4 bg-green-500 rounded-full' />
									<span className='font-medium flex-1 text-gray-700'>
										Positive Reviews
									</span>
								</div>
								<div className='flex items-center space-x-4'>
									<div className='w-32 bg-gray-200 rounded-full h-2'>
										<div
											className='bg-green-500 h-2 rounded-full transition-all duration-500'
											style={{
												width: `${positivePercent.toFixed(1)}%`,
											}}
										/>
									</div>
									<span className='text-sm font-semibold text-gray-900 w-12 text-right'>
										{positivePercent.toFixed(1)}%
									</span>
								</div>
							</div>
							{/* Neutral Review */}
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-3'>
									<div className='size-4 bg-yellow-500 rounded-full' />
									<span className='font-medium flex-1 text-gray-700'>
										Neutral Reviews
									</span>
								</div>
								<div className='flex items-center space-x-4'>
									<div className='w-32 bg-gray-200 rounded-full h-2'>
										<div
											className='bg-yellow-500 h-2 rounded-full transition-all duration-500'
											style={{
												width: `${neutralPercent.toFixed(1)}%`,
											}}
										/>
									</div>
									<span className='text-sm font-semibold text-gray-900 w-12 text-right'>
										{neutralPercent.toFixed(1)}%
									</span>
								</div>
							</div>
							{/* Negative Review */}
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-3'>
									<div className='size-4 bg-red-500 rounded-full' />
									<span className='font-medium flex-1 text-gray-700'>
										Negative Reviews
									</span>
								</div>
								<div className='flex items-center space-x-4'>
									<div className='w-32 bg-gray-200 rounded-full h-2'>
										<div
											className='bg-red-500 h-2 rounded-full transition-all duration-500'
											style={{
												width: `${negativePercent.toFixed(1)}%`,
											}}
										/>
									</div>
									<span className='text-sm font-semibold text-gray-900 w-12 text-right'>
										{negativePercent.toFixed(1)}%
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
            {/* all reviews */}
            <div className="mb-8">
               <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  All Reviews
               </h3>
               {
                  !company?.reviews || company?.reviews?.length === 0 ? (
                     <p  className="text-gray-600">No Reviews available for this company</p>
                  ):(
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {
                           company?.reviews?.map((review)=>(
                              <ReviewCard key={review._id} review={review}/>
                           ))
                        }
                     </div>
                  )
               }

            </div>
			</section>
		</div>
	);
};

export default CompanyDetails;
