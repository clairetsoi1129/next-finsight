import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../client";
import { CSVData } from "@/app/types";

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

    const interests = await prisma.interest.findMany({
      where: whereClause,
    });

    return NextResponse.json(interests, { status: 200 });
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
    console.log("POST Received data:", data);
    const csvData: CSVData = data.data;
    // console.log("POST Received CSV data:", csvData);

    if (!Array.isArray(csvData)) {
      console.error("Invalid data format: Expected an array");
      throw new Error("Invalid data format: Expected an array");
    }

    const interestsToCreate = csvData.map((entry) => {
      const dateString = entry["DATE"];
      const [year, month, day] = dateString
        .split("-")
        .map((component: string) => parseInt(component, 10));

      const date = new Date(year, month - 1, day); // Month is zero-based in JavaScript Date constructor

      return {
        payDate: date,
        instrumentCode: entry["DESCRIPTION"],
        amount: parseFloat(entry["AMOUNT"]),
        currencyCode: entry["CURRENCY"],
        exchangeRate: 0,
      };
    });

    const interestsCreated = await prisma.interest.createMany({
      data: interestsToCreate,
    });
    return NextResponse.json(interestsCreated, { status: 201 });
  } catch (error) {
    console.error("request error", error);
    return NextResponse.json({ error: "error updating post" }, { status: 500 });
  }
}
