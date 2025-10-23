"use client";

import { handleRequest } from "@/components/utils/apiRequest";
import { LoadingButton } from "@/components/utils/LoadingButton";
import { BASE_API_URL } from "@/server";
import { CompanyType } from "@/type";
import axios from "axios";
import { Briefcase, Building2, FileText, Heart, Send, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "sonner";

const ShareStory = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [companies, setCompanies] = useState<CompanyType[]>([]);
	const [formData, setFormData] = useState({
		vibe: "neutral",
		companyName: "",
		isAnonymous: false,
		name: "",
		userType: "individual customer",
		title: "",
		story: "",
	});

	const companyOptions = companies.map((c) => ({
		label: c.name,
		value: c.name,
	}));

	//Vibe options
	const vibeOptions = [
		{ value: "neutral", label: "Neutral" },
		{ value: "positive", label: "Positive" },
		{ value: "negative", label: "Negative" },
	];

	//user type options
	const userTypeOptions = [
		{ value: "individual customer", label: "Individual Customer" },
		{ value: "business customer", label: "Business Customer" },
		{ value: "bank employee", label: "Bank Employee" },
		{ value: "former employee", label: "Former Employee" },
		{ value: "investor", label: "Investor" },
		{ value: "other", label: "Other" },
	];

	//Fetching our company from backend
	useEffect(() => {
		async function fetchCompanies() {
			const companyReq = async () => await axios.get(`${BASE_API_URL}/companies/all`);
			const result = await handleRequest(companyReq, setIsLoading);

			if (result?.data?.status === "success") {
				setCompanies(result?.data.data.companies);
			}
		}
		fetchCompanies();
	}, []);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const payLoad = {
			vibe: formData.vibe,
			companyName: formData.companyName,
			isAnonymous: formData.isAnonymous,
			userType: formData.userType,
			title: formData.title,
			story: formData.story,
			...(formData.isAnonymous ? {} : { name: formData.name }),
		};

		const shareReviewReq = async () =>
			axios.post(`${BASE_API_URL}/reviews/create`, payLoad, { withCredentials: true });
		const result = await handleRequest(shareReviewReq, setIsLoading);

		if (result?.data?.status === "success") {
			toast.success("Your submitted successfully!");
			router.push("/reviews");
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;
		setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
	}

	return (
		<div className='min-h-screen mt-10 bg-gray-100 py-10'>
			<div className='max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md'>
				<h1 className='text-xl sm:text-2xl font-bold mb-4 text-center'>
					Share Your Company Experience
				</h1>

				<form onSubmit={handleSubmit} className='space-y-5'>
					{/* Vibe */}
					<div>
						<label className='block font-medium mb-1 text-gray-700'>
							<Heart className='size-4 mr-2 inline' />
							Vibe
						</label>
						<Select
							name='vibe'
							options={vibeOptions}
							value={{
								value: formData.vibe,
								label:
									formData.vibe.charAt(0).toUpperCase() + formData.vibe.slice(1),
							}}
							onChange={(selected) =>
								setFormData({ ...formData, vibe: selected?.value || "neutral" })
							}
							isSearchable={false}
						/>
					</div>

					{/* Company name */}
					<div>
						<label className='block font-medium mb-1 text-gray-700'>
							<Building2 className='size-4 mr-2 inline' />
							Company
						</label>
						<Select
							options={companyOptions}
							value={companyOptions.find(
								(opt) => opt.value === formData.companyName,
							)}
							onChange={(selected) =>
								setFormData({ ...formData, companyName: selected?.value || "" })
							}
							placeholder='Select a company'
						/>
					</div>

					{/* Anonymous */}
					<div className='flex items-center space-x-2'>
						<input
							type='checkbox'
							name='isAnonymous'
							checked={formData.isAnonymous}
							onChange={handleChange}
						/>
						<label className='text-sm text-gray-700'>Post Anonymously</label>
					</div>

					{/* Name field- only show if not anonymous */}
					{!formData.isAnonymous && (
						<div>
							<label className='block font-medium mb-1 text-gray-700'>
								<User className='size-4 mr-2 inline' />
								Name
							</label>
							<input
								type='text'
								name='name'
								value={formData.name}
								onChange={handleChange}
								placeholder='Enter your name'
								className='w-full border px-3 py-2 rounded'
							/>
						</div>
					)}

					{/* User type select */}
					<div>
						<label className='block font-medium mb-1 text-gray-700'>
							<Briefcase className='size-4 mr-2 inline' />
							User Type
						</label>
						<Select
							name='userType'
							options={userTypeOptions}
							value={{
								value: formData.userType,
								label: formData.userType
									.split(" ")
									.map((word) => word[0].toUpperCase() + word.slice(1))
									.join(" "),
							}}
							onChange={(selected) =>
								setFormData({
									...formData,
									userType: selected?.value || "individual customer",
								})
							}
						/>
					</div>

					{/* Title */}
					<div>
						<label className='block font-medium mb-1 text-gray-700'>
							<FileText className='size-4 mr-2 inline' />
							Review Title
						</label>
						<input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleChange}
							placeholder='One-line summary of your review'
							required
							className='w-full border px-3 py-2 rounded'
						/>
					</div>

					{/* Description */}
					<div>
						<label className='block font-medium mb-1 text-gray-700'>
							<FileText className='size-4 mr-2 inline' />
							Review
						</label>
						<textarea
							name='story'
							value={formData.story}
							onChange={handleChange}
							placeholder='Describe your experience...'
							required
							rows={6}
							className='w-full border px-3 py-2 rounded resize-y'
						/>
					</div>

					{/* Submit button */}
					<div className='text-right'>
						<LoadingButton
							isLoading={isLoading}
							type='submit'
							className='bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px6 rounded disabled:opacity-50'>
							<span className='inline-flex items-center'>
								<Send className='size-4 mr-2' />
								Share Review
							</span>
						</LoadingButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ShareStory;
