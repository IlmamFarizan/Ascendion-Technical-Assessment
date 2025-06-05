"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/app/dashboard/layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: string;
};

export default function DashboardPage() {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/transaction-history");
      const data = await res.json();
      setTransactions(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  const router = useRouter();

  const handleNext = () => {
    router.push(`/`);
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <DashboardLayout>
      <main className="min-h-screen flex flex-col items-center bg-gray-100 p-6 gap-8">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            🎉 Login Successful!
          </h2>
          <p className="text-gray-600">
            Welcome to your dashboard. You&apos;re now securely logged in.
          </p>
          <Button onClick={handleNext} className="w-full">
            Back to Home
          </Button>
        </div>

        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Transaction History
          </h1>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>{tx.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
