import { Company } from "@/models/company";
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse):Promise<any> => {
  var url = "https://venefish.enesien.com/api/companies";
  try
  {

    const apiRes = await fetch(url);
    const data = await apiRes.json();
    console.log(`/api/getCompanies success`)
    return res.status(200).json(data);
  }
  catch(error)
  {
      console.error(`Error occured in api/getCompanies: ${error}`)
      throw new Error("Error retrieving company list")
  }
};

export default handler
