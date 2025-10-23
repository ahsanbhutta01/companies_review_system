import CompanyDetails from "./CompanyDetails";

type compantDtailsProps={
   params: Promise<{id: string}>
}

const CompanyDetailsPage =async ({params}: compantDtailsProps) => {
   const {id} = await params;
  return <CompanyDetails id={id}/>
}

export default CompanyDetailsPage
