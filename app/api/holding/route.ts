import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../client";
import { CSVData, Holding } from "@/app/types";

type Params = { query: { startDate: string; endDate: string } };

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let whereClause = {};

    if (startDate && endDate) {
      whereClause = {
        tradeDate: {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        },
      };
    }

    const holdings = await prisma.holding.findMany({
      where: whereClause,
    });

    // console.log(holdings);

    return NextResponse.json(holdings, { status: 200 });
  } catch (error) {
    console.log(`${error}`);
    return NextResponse.json(
      { error: "Failed to fetch all holdings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    // console.log("POST Received data:", data);
    const csvData: CSVData = data.data;
    // console.log("POST Received CSV data:", csvData);

    if (!Array.isArray(csvData)) {
      console.error("Invalid data format: Expected an array");
      throw new Error("Invalid data format: Expected an array");
    }

    const holdingsToCreate = csvData.map((entry) => {
      const dateString = entry["TRADEDATE"];
      const [month, day, year] = dateString
        .split("/")
        .map((component: string) => parseInt(component, 10));

      const date = new Date(year, month - 1, day); // Month is zero-based in JavaScript Date constructor

      return {
        tradeDate: date,
        instrumentCode: entry["SYMBOL"],
        marketCode: entry["EXCHANGE"],
        quantity: parseInt(entry["QUANTITY"], 0),
        price: parseFloat(entry["TRADEPRICE"]),
        transactionType: entry["BUY/SELL"],
        exchangeRate: parseFloat(entry["FXRATETOBASE"]),
        brokerage: parseFloat(entry["IBCOMMISSION"]),
        brokerageCurrency: entry["IBCOMMISSIONCURRENCY"],
      };
    });

    const holdingsCreated = await prisma.holding.createMany({
      data: holdingsToCreate,
    });
    return NextResponse.json(holdingsCreated, { status: 201 });
  } catch (error) {
    console.error("request error", error);
    return NextResponse.json({ error: "error updating post" }, { status: 500 });
  }
}
