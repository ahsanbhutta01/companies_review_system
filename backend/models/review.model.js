import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
   vibe:{
      type: String,
      enum: ['positive', "negative", "neutral"],
      required: true
   },
   companyName:{
      type: String,
      required: true
   },
   isAnonymous:{
      type: Boolean,
      default: false
   },
   name:{
      type:String,
      required: function(){return !this.isAnonymous},
      //Example: koi review/complaint likh raha hai aur keh raha hai “main apna name show ni krwana chahta”. mean wo "Anonymous" wala btn ko true kr da
      // " isAnonymous: true" tu us ko name dana ki zrort ni hogi or us ka review post ho jay ga
   
   },
   anonymousId:{
      type: String,
      required: function (){return this.isAnonymous}
   },
   userType:{
      type: String,
      enum:[
         "individual customer", 
         "business customer",
         "bank employee",
         "investor",
         "other"
      ],
      required: true
   },
   title:{
      type:String,
      required: true
   },
   story:{
      type: String,
      required: true
   }
}, {timestamps: true})

const reviewModel = mongoose.models.Review || mongoose.model("Review", reviewSchema)
export default reviewModel