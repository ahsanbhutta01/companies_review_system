import catchAsync from '../utils/catchAsync.js'
import Review from '../models/review.model.js'
import Company from '../models/company.model.js'
import crypto from 'crypto'

function generateAnonymousId(){
   return "Anon-" + crypto.randomBytes(3).toString("hex")
}

const getAllReviews = catchAsync(async function (req, res) {
   const {
      companyName = "",
      vibe = "",
      search = "",
      sort = "newest",
      page = 1,
      limit = 6
   } = req.query;

   const filter = {}
   if (companyName) filter.companyName = { $regex: companyName, $options: "i" };
   if (vibe) filter.vibe = vibe;
   if (search) filter.title = { $regex: search, $options: "i" };

   const sortOption = sort === 'oldest' ? 'createdAt' : '-createdAt';
   const skip = (page - 1) * limit;

   const [reviews, total] = await Promise.all(
      [
         Review.find(filter).sort(sortOption).skip(skip).limit(Number(limit)),
         Review.countDocuments(filter)

      ]);

   res.status(200).json({
      status: 'success',
      results: reviews.length,
      total,
      page: Number(page),
      totalPage: Math.ceil((total / limit)),
      data: { reviews }
   })
})

const createReviews = catchAsync(async function(req, res, next){
   const {vibe, companyName, isAnonymous, name, userType, title, story} = req.body;

   if(!isAnonymous && !name){
      return next(new AppError("Name is required when you are not anonymous", 400))
   }

   const company = await Company.findOne({
      name: companyName.trim()
   })
   if(!company){
      return next(new AppError("Please select a valid company from list", 400))
   }

   const newStory = await Review.create({
      vibe,
      companyName: company.name,
      isAnonymous,
      name: isAnonymous ? undefined : name,
      anonymousId: isAnonymous ? generateAnonymousId() : undefined,
      userType,
      title,
      story
   })

   const update = {
      $push: {reviews: newStory._id},
      $inc: {totalReviews: 1}
   }
   if(vibe==="positive")  update.$inc.positiveCount = 1;
   if(vibe==="negative")  update.$inc.negativeCount = 1;
   if(vibe==="neutral")   update.$inc.neutralCount = 1;

   await Company.findByIdAndUpdate(company._id, update)

   res.status(200).json({
      status:'success',
      message:"Review submitted successfully!",
      data:{
         story: newStory
      }
   })

})



export {getAllReviews, createReviews}