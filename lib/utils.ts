
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export const useCompanies = () => 
  {
    const getCompanies = async () => {
      try{
      var url = 'api/handleGetCompanies'
      const res = await fetch(url);
      console.log(`utils.getCompanies success`)
      return res;
      }catch(error){
        return null;
      }
    }
    return{
      getCompanies,
    }
  }