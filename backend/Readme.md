                  <!-- 1st -->

app.use(helmet());
— Helmet middleware apply kar rahe ho — kuch important HTTP security headers (jaise X-Frame-Options, X-Content-Type-Options) set ho jaate hain.

                  <!-- 2nd -->
<!-- For Limiter -->
const Limiter = rateLimit({

windowMs: 60*60*1000,

max: 10000,

message: "Too many request from this IP, please try again in one hour",

standardHeaders: true,

legacyHeaders: false

})
— Rate limiter banaya ja raha hai: ek ghante (60*60*1000 ms) me ek IP maximum 10000 requests send kar sakta. Agar zyada kare to custom message milega. standardHeaders: true se rate-limit info HTTP headers me jayegi; legacyHeaders: false purane headers disable kar diye gaye.

(blank line)

app.use('/api',Limiter);
— Jo bhi routes /api se start hote hain, unpe above rate limiter apply ho jayega.


                  <!-- 3rd -->
<!-- For mongoSanitzer -->
app.use((req, res, next)=>{

mongoSanitize.sanitize(req.body);

mongoSanitize.sanitize(req.params);

``

const queryCopy = {...req.query}

mongoSanitize.sanitize(queryCopy);

``

req.querySanitized = queryCopy;

next()

})
— Ek custom middleware:
— req.body aur req.params ko mongoSanitize se clean kar raha hai (taake $ ya . jaise malicious Mongo operators remove ho jayen).
— req.query directly sanitize nahi karne ke bajaye uski copy banai (queryCopy) aur usko sanitize kiya, phir sanitized copy ko req.querySanitized me store kiya. (Is tarah original req.query safe rehta ya agar tum original chahte ho to sanitized version use karo.)


                     <!-- 4th -->
<!-- For morgan -->
morgan('dev') console pe har request ka short aur useful record dikhata — jaise method (GET), URL, status code, response time — jo debugging ke liye mustahkam madad hai.

<!-- morgan('dev') kya show karta hai? — ek sample line -->
GET /api/users 200 123 - 12.345 ms
   GET = HTTP method

   /api/users = requested path

   200 = HTTP response status (green color agar terminal support kare)

   123 = response body ka size (bytes)

   12.345 ms = request ko process karne mein laga waqt



               <!-- 5th -->
<!-- AppError class ki justification nicha ha -->
   class AppError extends Error{
   constructor(message, statusCode){
      super(message)
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      Error.captureStackTrace(this, this.constructor)
   }
}

<!-- Justification -->

   <!-- class AppError extends Error  -->
      Ye ek custom error class hai jo JavaScript ki built-in Error class se inherit karti hai.

      Matlab: jo normal Error hota hai (message, stack trace), uske upar hum apni extra cheezein (jaise status code) add kar rahe hain.



   <!-- constructor(message, statusCode)  -->
      Jab bhi tum new AppError("Something went wrong", 400) likhoge,
      ye constructor run hoga aur tumhara message + statusCode andar set ho jayega.


   <!-- super(message) -->
      Ye parent Error class ka constructor call karta hai aur usko message pass karta hai.

      Isse tumhari error object mein normal message property set ho jati hai (jaise built-in error mein hoti hai).

   <!-- this.statusCode = statusCode; -->
      Ye custom property add karta hai jo batati hai HTTP status code (e.g. 404, 500, 400)

   
   <!-- Error.captureStackTrace(this, this.constructor) -->
   uper wali line use krna sa srf error mn srf ye wali line show ni hogi bs 
   (at new AppError (/Users/ahsan/project/index.js:4:5)) mtlb skip ho jay gi




                     <!-- 6th  -->
   <!-- const [reviews, total] = await Promise.all(
      [
         Review.find(filter).sort(sortOption).skip(skip).limit(Number(limit)),
         Review.countDocuments(filter)

      ]); -->

   "Promise.all([...])": Ye ek saath multiple async kaam chalata hai.

      Yahan do kaam ho rahe hain:
         Reviews ko DB se laana (with filter + sort + pagination) or pehle variable "reviews" mn daal do
         Total reviews count nikalna (without pagination, sirf filter ke hisaab se) or isa dosra variabl "total" mn daal do

👉 Matlab ek request me do queries chal rahi hain.