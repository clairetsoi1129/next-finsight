import { NextResponse } from "next/server";
import { prisma } from "../client";
import { CSVData, Holding } from "@/app/types";
import { NextApiRequest, NextApiResponse } from "next";

type Params = { query: { startDate: string; endDate: string } };

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { startDate, endDate } = req.query || {};

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

    console.log(holdings);

    return NextResponse.json(holdings, { status: 200 });
  } catch (error) {
    console.log(`${error}`);
    NextResponse.json(
      { error: "Failed to fetch all holdings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    console.log("POST Received data:", data);
    const csvData: CSVData = data.data;
    console.log("POST Received CSV data:", csvData);

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
