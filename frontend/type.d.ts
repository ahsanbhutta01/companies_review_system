export type VibeType = "positive" | "negative" | "neutral"

export type UserType = "individual customer" | "business customer" | "bank employee" | "former employee" | "investor" | "other"

export interface Review{
   _id: string;
   vibe: VibeType;
   companyName: string;
   isAnonymous: boolean;
   anonymousId?:string
   title:string;
   name?: string;
   userType: UserType;
   story: string;
   createdAt: string;
   updatedAt: string;
}

export interface CompanyType{
   _id: string;
   name: string;
   positiveCount: number;
   negativeCount: number;
   totalReviews: number;
   neutralCount: number;
   reviews: Review[];
   complaintRate: number;
}