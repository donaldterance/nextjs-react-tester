'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import {useCompanies, formatCurrency } from '@/lib/utils'
import { Company } from "@/models/company";
import { Suspense, useEffect,useState } from "react";
const  CompanyTable = () => {

    
    const {getCompanies} = useCompanies();
    const [companyList, setResults] = useState<Company[]>([]);
    const [employeeNumbers, setEmpNumbers] = useState(0);
    const [companyRevenue, setCompanyRevenue] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [didMount, setDidMount] = useState(false);
 
    useEffect(() => {

       // if (!didMount) {
            getCompanies().then(apiRes=>{return apiRes?.json()}).then((result) =>{
                setResults(result);
                setEmpNumbers((result as Company[]).reduce((n, {employees}) => n + employees, 0))
                setCompanyRevenue((result as []).reduce((n, {revenue}) => n + revenue, 0))
            });   
               
            setDidMount(true);
       // }

       
    }, []);

    function Loading() {
        return <h2>🌀 Loading...</h2>;
      }
    
    return (
        <Suspense fallback={<Loading />}>
        <Table>
        <TableCaption className="font-bold">React Next.js Tester</TableCaption>
        <TableHeader>
          <TableRow>
            
            <TableHead >Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Revenue</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
        {companyList.map(item=> {
        
            return(
          <TableRow key={item.id}>
            {/* <HoverCard>
            <HoverCardTrigger> */}
              <TableCell className="font-semibold">{item.name}</TableCell>
              {/* </HoverCardTrigger>
            <HoverCardContent>
                Description: {item.description}
            </HoverCardContent>
            </HoverCard> */}
            <TableCell>{item.location}</TableCell>
            <TableCell>{item.employees}</TableCell>
            <TableCell>{item.website}</TableCell>
            <TableCell>{formatCurrency.format(item.revenue)}</TableCell>
  
          </TableRow>)
})}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-semibold">Total</TableCell>
            <TableCell colSpan={2}className="font-semibold">{employeeNumbers}</TableCell>
            <TableCell className="font-semibold">{formatCurrency.format(companyRevenue)}</TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </Suspense>
    )
}

export default CompanyTable;