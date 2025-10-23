import Company from '../models/company.model.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getAllCompanies = catchAsync(async function (req, res) {
   const companies = await Company.find().sort({ name: 1 });

   res.status(200).json({
      status: 'success',
      results: companies.length,
      data: {
         companies
      }
   })
})

const getAllCompaniesTotalStats = catchAsync(async function (req, res) {
   const companies = await Company.find();
   const totalCompanies = companies.length;

   const totalReviews = companies.reduce((acc, company) => acc + (company.totalReviews || 0), 0);
   const totalComplaints = companies.reduce((acc, company) => acc + (company.negativeCount || 0), 0);
   const avgComplaintRate = totalReviews === 0 ? 0 : ((totalComplaints / totalReviews) * 100).toFixed(2)

   const stats = {
      totalCompanies,
      totalReviews,
      averageComplaintRate: Number(avgComplaintRate)
   };

   res.status(200).json({ status: 'success', data: { stats } })

})

const getSignleCompanyStats = catchAsync(async function (req, res) {
   const { sort, page = 1, limit = 10, search = "" } = req.query;

   const pageNumber = parseInt(page)
   const limitNumber = parseInt(limit)
   const skip = (pageNumber - 1) * limitNumber;

   let allCompanies = await Company.find({
      name: { $regex: search, $options: 'i' }
   }).lean()

   allCompanies = allCompanies.map((company) => {
      const { negativeCount, totalReviews } = company;
      const complaintRate = totalReviews === 0 ? 0 : parseFloat(((negativeCount / totalReviews) * 100).toFixed(2));

      return {
         ...company,
         complaintRate
      }
   });

   //Sort based on query
   switch (sort) {
      case "review_asc":
         allCompanies.sort((a, b) => a.totalReviews - b.totalReviews);
         break;
      case "review_desc":
         allCompanies.sort((a, b) => b.totalReviews - a.totalReviews);
         break;
      case "complaints_asc":
         allCompanies.sort((a, b) => a.complaintRate - b.complaintRate);
         break;
      case "complaints_desc":
         allCompanies.sort((a, b) => b.complaintRate - a.complaintRate);
         break;
      default:
         allCompanies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
         break;
   }

   const totalCompanies = allCompanies.length;
   const totalPages = Math.ceil(totalCompanies / limitNumber)

   //pagination
   const paginatedCompanies = allCompanies.slice(skip, skip + limitNumber)
   res.status(200).json({
      status: 'success',
      totalCompanies,
      totalPages,
      currentPage: pageNumber,
      count: paginatedCompanies.length,
      data: {
         companies: paginatedCompanies
      }
   })

})

const getCompanyById = catchAsync(async function (req, res, next) {
   const { id } = req.params;

   const company = await Company.findById(id).populate({ path: "reviews" }).lean();
   if (!company) {
      return next(new AppError("No company found", 404))
   };

   const { totalReviews, negativeCount } = company;
   const complaintRate = totalReviews === 0 ? 0 : parseFloat(((negativeCount / totalReviews) * 100).toFixed(2));
   const companyWithStats = {...company, complaintRate};

   res.status(200).json({
      status: 'success',
      message: "Company details",
      data:{
         company: companyWithStats
      }
   })

})




export { getAllCompanies, getAllCompaniesTotalStats, getSignleCompanyStats, getCompanyById }