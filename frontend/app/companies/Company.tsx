"use client";

import { useDebounce } from "@/components/hooks/useDebounce";
import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import axios from "axios";
import { ChevronDown, ChevronUp, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import TotalStats from "./TotalStats";
import { cn } from "@/lib/utils";
import Card from "./Card";

type SortField = "complaintRate" | "totalReviews";
type SortOrder = "asc" | "desc";

const Company = () => {
	const [sortField, setSortField] = useState<SortField>("complaintRate");
	const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
	const [companies, setCompanies] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(9);
	const [totalCompanies, setTotalCompanies] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [totalStats, setTotalStats] = useState({
		averageComplaintRate: 0,
		totalCompanies: 0,
		totalReviews: 0,
	});

	const debounceSearch = useDebounce(searchQuery, 500);

	useEffect(() => {
		async function fetchTotalStats() {
			const totalStatsReq = async () =>
				await axios.get(`${BASE_API_URL}/companies/total-stats`);
			const result = await handleRequest(totalStatsReq, setIsLoading);

			if (result) {
				setTotalStats(result?.data?.data?.stats);
			}
		}
		fetchTotalStats();
	}, []);

	useEffect(() => {
		async function getSignleCompanyStats() {
			const sortParam =
				sortField === "totalReviews"
					? `review_${sortOrder}`
					: `complaints_${sortOrder}`;

			const SingleCompanyStatsReq = async () =>
				await axios.get(`${BASE_API_URL}/companies/stats`, {
					params: {
						page,
						limit,
						sort: sortParam,
						search: debounceSearch,
					},
				});
			const result = await handleRequest(SingleCompanyStatsReq, setIsLoading);
			if (result) {
				setCompanies(result?.data?.data?.companies);
				setTotalCompanies(result?.data?.totalCompanies);
			}
		}
		getSignleCompanyStats();
	}, [limit, page, sortField, sortOrder, debounceSearch]);

	function getSortIcon(field: SortField) {
		if (field !== sortField) return null;

		return sortOrder === "desc" ? (
			<ChevronUp className='size-4 ml-1' />
		) : (
			<ChevronDown className='size-4 ml-1' />
		);
	}

	function handleSort(field: SortField) {
		if (field === sortField) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortOrder(field === "complaintRate" ? "desc" : "asc");
		}
	}

	function scrollToTop() {
		window.scrollTo(0, 0);
	}
	const isLastPage = page * limit >= totalCompanies;
	return (
		<div className='sm:w-[80%] w-full p-8 mx-auto mb-8 mt-[8rem]'>
			{/* Header */}
			<section>
				<h1 className='sm:text-3xl text-2xl font-bold text-gray-900 mb-2'>
					Company Statistics
				</h1>
				<p className='text-gray-600'>
					Detailed performance matrics based on customer reviews
				</p>
			</section>

			{/* State card */}
			<section className='grid grid-cols-1 md:grid-cols-3 gap-6 my-8'>
				<TotalStats
					title='Total Companies'
					type='companies'
					value={totalStats.totalCompanies}
				/>
				<TotalStats
					title='Total Reviews'
					type='reviews'
					value={totalStats.totalReviews}
				/>
				<TotalStats
					title='Average Complaint Rate'
					type='complaints'
					value={`${totalStats?.averageComplaintRate}%`}
				/>
			</section>

			{/* Company ranking */}
			<section className='mt-12'>
				<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6'>
					<div>
						<h1 className='sm:text-2xl text-xl font-bold text-gray-900 mb-2'>
							Company Performance Ranking
						</h1>
						<p className='text-gray-600'>Click on the matrics to sort companies</p>
					</div>
					<div className='flex flex-wrap gap-2 mt-4 sm:mt-0'>
						<div className='flex-1'>
							<input
								type='text'
								placeholder='Search Companies...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full px-4 py-2 border placeholder:text-base border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
							/>
						</div>
						<button
							onClick={() => handleSort("complaintRate")}
							className={cn(
								"flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer",
								sortField === "complaintRate"
									? "bg-blue-100 text-blue-700 border border-blue-200"
									: "bg-gray-100 text-gray-600 hover:bg-gray-200",
							)}>
							Complaint Rate
							{getSortIcon("complaintRate")}
						</button>
						<button
							onClick={() => handleSort("totalReviews")}
							className={cn(
								"flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer",
								sortField === "totalReviews"
									? "bg-blue-100 text-blue-700 border border-blue-200"
									: "bg-gray-100 text-gray-600 hover:bg-gray-200",
							)}>
							Total Reviews
							{getSortIcon("totalReviews")}
						</button>
					</div>
				</div>
				{/* Comapny Card */}
				{isLoading && (
					<div className='text-center flex items-center justify-center'>
						<Loader className='w-8 max-auto animate-spin' />
					</div>
				)}
				{!isLoading && <Card companies={companies} />}

				<div className="mt-8 flex justify-center items-center space-x-4">
					<button onClick={()=>{
						setPage((prev)=>Math.max(prev-1, 1));
						scrollToTop();
					}}
					disabled={page===1}
					className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
					>
						Prev
					</button>
					<span className="text-gray-700 font-medium">Page {page}</span>
					<button onClick={()=>{
						setPage((prev)=>prev+1);
						scrollToTop();
					}}
					disabled={isLastPage}
					className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
					>
						Next
					</button>
				</div>
			</section>
		</div>
	);
};

export default Company;
