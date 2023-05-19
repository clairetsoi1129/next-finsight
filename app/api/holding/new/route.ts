import { NextResponse } from "next/server";
import { prisma } from "../../client";
import { CSVData, Holding } from "@/app/types";

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    // console.log("POST Received data:", data);
    const csvData: CSVData = data.data;
    // console.log("POST Received CSV data:", csvData);

    const holdingData = {
      tradeDate: new Date(data.tradeDate),
      instrumentCode: data.instrumentCode,
      marketCode: data.marketCode,
      quantity: parseInt(data.quantity, 0),
      price: parseFloat(data.price),
      transactionType: data.transactionType,
      exchangeRate: parseFloat(data.exchangeRate),
      brokerage: parseFloat(data.brokerage),
      brokerageCurrency: data.brokerageCurrency,
    };

    const holdingCreated = await prisma.holding.create({
      data: holdingData,
    });
    return NextResponse.json(holdingCreated, { status: 201 });
  } catch (error) {
    console.error("request error", error);
    NextResponse.json({ error: "error updating post" }, { status: 500 });
  }
}
