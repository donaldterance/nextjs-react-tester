'use client'

import { companyColumns } from "./company-columns"
import { DataTable } from "./company-data-table"
import {useCompanies, formatCurrency } from '@/lib/utils'
import { Company } from "@/models/company";
import { Suspense, useEffect,useState } from "react";


export default function CompanyContainer() {
    const {getCompanies} = useCompanies();
    const [companyList, setCompanyList] = useState<Company[]>([]);
    const [employeeTotal, setEmpNumbers] = useState(0);
    const [revenueTotal, setRevenueTotal] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [didMount, setDidMount] = useState(false);
 
    useEffect(() => {
            getCompanies().then(apiRes=>{return apiRes?.json()}).then((result) =>{
              setCompanyList(result);
                setEmpNumbers((result as Company[]).reduce((n, {employees}) => n + employees, 0))
                setRevenueTotal((result as []).reduce((n, {revenue}) => n + revenue, 0))
            });   
               

       },[])
 
  return (
    <div className="container mx-auto py-10">
      <DataTable 
        columns={companyColumns} 
        data={companyList} 
        caption="React Next.js Tester" 
        employeeTotal={employeeTotal}
        revenueTotal={formatCurrency.format(revenueTotal)}
        />
    </div>
  )
}

