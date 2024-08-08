import { Company } from "@/models/company";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const useCompanies = () => {
  const getCompanies = async (): Promise<Company[] | null> => {
    try {
      var url = "api/handleGetCompanies";
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("utils.getCompanies failure");
      return null;
    }
  };
  return {
    getCompanies,
  };
};
