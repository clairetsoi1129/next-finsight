import { NextResponse } from "next/server";
import { prisma } from "../client";
import { CSVData, Holding } from "@/app/types";

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    console.log("POST Received data:", data);
    const csvData: CSVData = data.data;
    console.log("POST Received CSV data:", csvData);

    if (!csvData || !Array.isArray(csvData)) {
      return individualCreate(data);
    }
    return bulkCreate(csvData);
  } catch (error) {
    console.error("request error", error);
    NextResponse.json({ error: "error updating post" }, { status: 500 });
  }
}

export async function bulkCreate(data: CSVData) {
  try {
    // const data = await req.json();
    const csvData = data;
    console.log("bulkCreate Received CSV data:", csvData);

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

export async function individualCreate(data: Holding) {
  try {
    // const data = await req.json();
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
