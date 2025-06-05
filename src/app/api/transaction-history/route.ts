import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      id: "1",
      date: "2025-06-01",
      description: "Payment to Vendor A",
      amount: "-$200.00",
      status: "Completed",
    },
    {
      id: "2",
      date: "2025-06-02",
      description: "Salary Credited",
      amount: "+$5,000.00",
      status: "Completed",
    },
    {
      id: "3",
      date: "2025-06-03",
      description: "ATM Withdrawal",
      amount: "-$300.00",
      status: "Pending",
    },
  ];

  return NextResponse.json(data);
}
