import { NextResponse } from "next/server";
import { prisma } from "../client";
import { NextApiRequest, NextApiResponse } from "next";
import { Holding } from "@prisma/client";
import { CSVData } from "@/app/types";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const csvData = data.data;
    console.log("Received CSV data:", csvData);

    if (!Array.isArray(csvData)) {
      console.error("Invalid data format: Expected an array");
      throw new Error("Invalid data format: Expected an array");
    }

    const holdingsToCreate = csvData.map((entry) => {
      const dateString = entry["TradeDate"];
      const [month, day, year] = dateString
        .split("/")
        .map((component: string) => parseInt(component, 10));

      const date = new Date(year, month - 1, day); // Month is zero-based in JavaScript Date constructor

      return {
        tradeDate: date,
        instrumentCode: entry["Symbol"],
        marketCode: entry["Exchange"],
        quantity: parseInt(entry["Quantity"], 0),
        price: parseFloat(entry["TradePrice"]),
        transactionType: entry["Buy/Sell"],
        exchangeRate: parseFloat(entry["FXRateToBase"]),
        brokerage: parseFloat(entry["IBCommission"]),
        brokerageCurrency: entry["IBCommissionCurrency"],
      };
    });

    const holdingsCreated = await prisma.holding.createMany({
      data: holdingsToCreate,
    });
    return NextResponse.json(holdingsCreated, { status: 201 });
  } catch (error) {
    console.error("request error", error);
    NextResponse.json({ error: "error updating post" }, { status: 500 });
  }
}
