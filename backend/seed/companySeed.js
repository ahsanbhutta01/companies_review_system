import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Company from '../models/company.model.js'

dotenv.config({ path: '../config.env', override: true})

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD)
// const DB = process.env.db
mongoose.connect(DB)
   .then(() => console.log("DB Connection Successfull"))
   .catch((err) => console.log(err))

const companies = [
   // 🇵🇰 Pakistan (15)
   "Habib Bank Limited (HBL)",
   "United Bank Limited (UBL)",
   "MCB Bank Limited",
   "Allied Bank Limited (ABL)",
   "National Bank of Pakistan (NBP)",
   "Bank Alfalah",
   "Meezan Bank",
   "Faysal Bank",
   "Standard Chartered Pakistan",
   "Summit Bank",
   "Silkbank",
   "JS Bank",
   "Askari Bank",
   "Bank of Punjab (BOP)",
   "Sindh Bank",

   // 🌍 International (35)
   "JPMorgan Chase (USA)",
   "Bank of America (USA)",
   "Wells Fargo (USA)",
   "Citibank (USA)",
   "Goldman Sachs (USA)",
   "Morgan Stanley (USA)",

   "HSBC (UK)",
   "Barclays (UK)",
   "Lloyds Bank (UK)",
   "Standard Chartered (UK)",

   "Deutsche Bank (Germany)",
   "Commerzbank (Germany)",

   "BNP Paribas (France)",
   "Société Générale (France)",

   "UBS (Switzerland)",
   "Credit Suisse (Switzerland)",

   "Royal Bank of Canada (RBC)",
   "Toronto-Dominion Bank (TD, Canada)",
   "Bank of Montreal (BMO, Canada)",

   "Mitsubishi UFJ Financial Group (Japan)",
   "Mizuho Financial Group (Japan)",
   "Sumitomo Mitsui Banking Corporation (Japan)",

   "ICBC (Industrial & Commercial Bank of China)",
   "China Construction Bank",
   "Bank of China",
   "Agricultural Bank of China",

   "State Bank of India (SBI)",
   "Punjab National Bank (India)",
   "ICICI Bank (India)",
   "HDFC Bank (India)",
   "Axis Bank (India)",

   "Banco Santander (Spain)",
   "BBVA (Spain)",

   "ING Bank (Netherlands)"
];


// async function addCompanies() {
//    try {
//       await Company.deleteMany();

//       const formatted = companies.map((company) => ({
//          name: company.trim(),
//          totalReviews: 0,
//          positiveCount: 0,
//          negativeCount: 0,
//          neutralCount: 0,
//          reviews: []
//       }));

//       await Company.insertMany(formatted);
//       console.log("Companies added successfully!")
//       process.exit(1)

//    } catch (error) {
//       console.log("Error Adding companies", error);
//       process.exit(1)
//    }
// }

async function addCompanies() {
   try {
      for (const company of companies) {
         const name = company.trim();

         // Check if company already exists
         const existing = await Company.findOne({ name });

         if (!existing) {
            // New company → create it
            await Company.create({
               name,
               totalReviews: 0,
               positiveCount: 0,
               negativeCount: 0,
               neutralCount: 0,
               reviews: []
            });
            console.log(`✅ Added new company: ${name}`);
         } else {
            console.log(`⚡ Skipped (already exists): ${name}`);
         }
      }

      console.log("All companies processed successfully!");
      process.exit(0);

   } catch (error) {
      console.error("❌ Error adding companies:", error);
      process.exit(1);
   }
}

async function deleteCompanies() {
   try {
      const result = await Company.deleteMany();
      console.log(`🗑️ Deleted ${result.deletedCount} companies from database.`);
      process.exit(0);
   } catch (error) {
      console.error("❌ Error deleting companies:", error);
      process.exit(1);
   }
}




// 'run' function is used like we want to add companies then we write command 'node companySeed.js --add' then companies added in database using function 'addCompanies'
const run = async () => {
   const arg = process.argv[2];

   if (arg === '--add') {
      await addCompanies();
   } else if (arg === '--delete') {
      await deleteCompanies();
   } else {
      console.log("⚙️ Usage:");
      console.log("   node companySeed.js --add     → Add companies");
      console.log("   node companySeed.js --delete  → Delete all companies");
      process.exit(1);
   }
}

run()