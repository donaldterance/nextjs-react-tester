import CompanyTable  from "@/components/ui/company";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-tl from-blue-400 to-blue-700 text-white space-y-6">
      <div className="bg-white/10 p-4">
        <div className="container">
          <h2 className="font-ornate text-2xl font-semibold tracking-tighter ">
            React Next.js Tester
          </h2>
        </div>
      </div>
      <div className="container">
      
        <Card>
          <CardHeader className="px-7">
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Loading />}>
            <CompanyTable/>
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
