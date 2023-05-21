import { NextResponse } from "next/server";
import { prisma } from "../client";
import { CSVData } from "@/app/types";
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

    const interests = await prisma.interest.findMany({
      where: whereClause,
    });

    return NextResponse.json(interests, { status: 200 });
  } catch (error) {
    console.log(`${error}`);
    NextResponse.json(
      { error: "Failed to fetch all dividend" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    console.log("POST Received data:", data);
    const csvData: CSVData = data.data;
    // console.log("POST Received CSV data:", csvData);

    if (!Array.isArray(csvData)) {
      console.error("Invalid data format: Expected an array");
      throw new Error("Invalid data format: Expected an array");
    }

    const dividendsToCreate = csvData.map((entry) => {
      const dateString = entry["DATE"];
      const [year, month, day] = dateString
        .split("-")
        .map((component: string) => parseInt(component, 10));

      const date = new Date(year, month - 1, day); // Month is zero-based in JavaScript Date constructor

      return {
        payDate: date,
        instrumentCode: entry["DESCRIPTION"],
        grossAmount: parseFloat(entry["AMOUNT"]),
        currencyCode: entry["CURRENCY"],
        exchangeRate: 0,
        quantity: 0,
        tax: 0,
        fee: 0,
        grossRate: 0,
        netAmount: 0,
      };
    });

    const dividendsCreated = await prisma.dividend.createMany({
      data: dividendsToCreate,
    });
    return NextResponse.json(dividendsCreated, { status: 201 });
  } catch (error) {
    console.error("request error", error);
    NextResponse.json({ error: "error updating post" }, { status: 500 });
  }
}
