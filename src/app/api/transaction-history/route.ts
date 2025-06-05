import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      id: "1",
      date: "24 Aug 2023",
      referenceId: "#8348348348342",
      to: "Bloom Enterprise Sdn Bhd",
      transactionType: "DuitNow payment",
      amount: "RM 1,200.00",
    },
    {
      id: "2",
      date: "14 Jul 2023",
      referenceId: "#8348348348342",
      to: "Muhammad Andy Asnawi",
      transactionType: "DuitNow payment",
      amount: "RM 54,810.016",
    },
    {
      id: "3",
      date: "12 Aug 2023",
      referenceId: "#8348348348342",
      to: "Utilities Company Sdn Bhd",
      transactionType: "DuitNow payment",
      amount: "RM 100.00",
    },
  ];

  return NextResponse.json(data);
}
