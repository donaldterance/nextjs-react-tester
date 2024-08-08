'use client'

import { companyColumns } from "./company-columns"
import { DataTable } from "./company-data-table"
import { useCompanies, formatCurrency } from '@/lib/utils'
import { Company } from "@/models/company";
import { Suspense, useCallback, useEffect, useState } from "react";
import { ErrorAlert } from "./company-alert";


export default function CompanyContainer() {
  const { getCompanies } = useCompanies();
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [employeeTotal, setEmpNumbers] = useState(0);
  const [revenueTotal, setRevenueTotal] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [didMount, setDidMount] = useState(false);

  const showAlertMessage = (message: string) => {
    setShowAlert(true);
    setAlertMessage(message)
    const timeId = setTimeout(() => {
      hideAlertMessage();
    }, 5000)
    timeId;
  };
  function hideAlertMessage() {
    setShowAlert(false);
    setAlertMessage("")

  }

  const fetchCompanies = useCallback(async () => {
    try {
      const apiResponse = await getCompanies();
      //const response = await apiResponse?.json();
      if (apiResponse) {
        setCompanyList(apiResponse!);
        setEmpNumbers((apiResponse! as Company[]).reduce((n, { employees }) => n + employees, 0))
        setRevenueTotal((apiResponse! as []).reduce((n, { revenue }) => n + revenue, 0))
        hideAlertMessage();
      }
      else {
        var message = 'Company list can not be retrieved at the moment. Please try again later'
        showAlertMessage(message);
      }
    } catch (error) {
      var message = 'Failure'
      showAlertMessage(message);
    };


  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies])

  return (
    <div className="container mx-auto py-10">
      {showAlert && (<ErrorAlert message={alertMessage} />)}
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

