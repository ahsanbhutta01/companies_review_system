"use client";

import { BarChart3, Building2, TrendingDown } from "lucide-react";

type StatsProps = {
	type: "companies" | "reviews" | "complaints";
	title: string;
	value: string | number;
};

const TotalStats = ({ title, type, value }: StatsProps) => {
	function getIcon() {
		switch (type) {
			case "companies":
				return <Building2 className='size-8 text-blue-600' />;
			case "reviews":
				return <BarChart3 className='size-8 text-gray-600' />;
			case "complaints":
				return <TrendingDown className='size-8 text-red-600' />;
		}
	}

	return (
		<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
			<section className='flex items-start justify-between'>
				<div>
					<p className='text-sm font-medium text-gray-600 mb-2'>{title}</p>
					<p className='text-3xl font-bold text-gray-900'>{value}</p>
				</div>
				<div className='flex-shrink-0'>{getIcon()}</div>
			</section>
		</div>
	);
};

export default TotalStats;
