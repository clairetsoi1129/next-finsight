import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../client";
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

function dateStrToDate(dateString: string) {
  const [month, day, year] = dateString
    .split("/")
    .map((component: string) => parseInt(component, 10));

  return new Date(year, month - 1, day); // Month is zero-based in JavaScript Date constructor
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    // console.log("POST Received data:", data);
    const startDateString = data.startDate;
    const endDateString = data.endDate;
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 0);

    const csvData: CSVData = data.data;
    console.log(
      `startDateString: ${startDateString} endDateString:${endDateString}`
    );
    // console.log("POST Received CSV data:", csvData);

    if (!Array.isArray(csvData)) {
      console.error("Invalid data format: Expected an array");
      throw new Error("Invalid data format: Expected an array");
    }

    const myCurrencies = ["AUD", "CAD", "HKD", "SGD", "USD"];

    const dataToCreate = csvData
      .filter((entry) => myCurrencies.includes(entry["CURRENCY CODE"]))
      .map((entry) => {
        return {
          startDate: startDate,
          endDate: endDate,
          currencyCode: entry["CURRENCY CODE"],
          exchangeRate: entry["STERLING VALUE OF CURRENCY UNIT £"]
            ? entry["STERLING VALUE OF CURRENCY UNIT £"]
            : entry["STERLING VALUE OF CURRENCY UNIT �"],
        };
      });

    const dataCreated = await prisma.exchangeRateYearly.createMany({
      data: dataToCreate,
    });
    return NextResponse.json(dataCreated, { status: 201 });
  } catch (error) {
    console.error("request error", error);
    return NextResponse.json({ error: "error updating post" }, { status: 500 });
  }
}
