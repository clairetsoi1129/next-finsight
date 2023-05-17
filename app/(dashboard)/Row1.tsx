import React, { useEffect, useState } from "react";
import DashboardBox from "../(shared)/DashboardBox";
import { Holding } from "@prisma/client";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

type Props = {};

type RowSum = {
  id: number;
  ticker: string;
  gain: number;
};

const Row1 = (props: Props) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);

  const [rowsSummary, setRowsSummary] = useState<RowSum[]>([]);

  const [startDate, setStartDate] = useState<string>("2019-04-06");
  const [endDate, setEndDate] = useState<string>("2023-04-05");

  const filterByDate = () => {
    console.log(`filterDate****`);
    setStartDate("2022-04-06");
    setEndDate("2023-04-05");
  };

  useEffect(() => {
    const getAllHoldings = async () => {
      // Step 1: Get the trading records from Database
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_URL}/api/holding`
        `${process.env.NEXT_PUBLIC_URL}/api/holding?startDate=${startDate}&endDate=${endDate}`
      );
      const tradingRecords = await response.json();
      console.log(`AllHoldings: ${tradingRecords}`);
      setHoldings(tradingRecords);

      // Step 2: Group the trading records by ticker
      const groupedRecords: { [key: string]: Holding[] } =
        tradingRecords.reduce(
          (groups: { [key: string]: Holding[] }, record: Holding) => {
            const { instrumentCode } = record;
            if (!groups[instrumentCode]) {
              groups[instrumentCode] = [];
            }
            groups[instrumentCode].push(record);
            return groups;
          },
          {}
        );

      // Step 3: Calculate the capital gain for each ticker
      const capitalGains: { [key: string]: number } = {};

      for (const ticker in groupedRecords) {
        const records = groupedRecords[ticker];

        const totalProceeds = records.reduce((sum: number, record: Holding) => {
          console.log(
            `${Number(record.price)}*${record.quantity}*${Number(
              record.exchangeRate
            )}`
          );
          return (
            sum +
            Number(record.price) * record.quantity * Number(record.exchangeRate)
          );
        }, 0);

        console.log(`ticker: ${ticker} totalProceeds: ${totalProceeds}`);
        const totalCost = records.reduce(
          (sum: number, record: Holding) => sum + Number(record.brokerage),
          0
        );

        capitalGains[ticker] = -totalProceeds; // + totalCost;
      }
      const rowsSummary = Object.entries(capitalGains).map(
        ([ticker, gain], index) => {
          const quantityRemain: number = groupedRecords[ticker].reduce(
            (sum: number, record: Holding) => sum + record.quantity,
            0
          );
          return {
            id: index, // Unique identifier for each row
            ticker,
            gain,
            quantityRemain,
          };
        }
      );
      setRowsSummary(rowsSummary);

      // Step 4: Calculate the total capital gain
      const totalCapitalGain = Object.values(capitalGains).reduce(
        (sum, capitalGain) => sum + capitalGain,
        0
      );
    };

    getAllHoldings();
  }, [startDate, endDate]);

  const columnsRaw: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "tradeDate",
      headerName: "Trade Date",
      width: 100,
      editable: true,
    },
    {
      field: "instrumentCode",
      headerName: "Ticker",
      width: 100,
      editable: true,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "transactionType",
      headerName: "Buy/Sell",
      width: 100,
      editable: true,
    },
    {
      field: "exchangeRate",
      headerName: "Exch. Rate",
      width: 100,
      editable: true,
    },
    {
      field: "brokerage",
      headerName: "Brokerage",
      type: "number",
      width: 100,
      editable: true,
    },
  ];

  const columnsSummary: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: true,
    },
    {
      field: "ticker",
      headerName: "Ticker",
      width: 100,
      editable: true,
    },
    {
      field: "gain",
      headerName: "Gain",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "quantityRemain",
      headerName: "Quantity remain",
      type: "number",
      width: 100,
      editable: true,
    },
  ];

  return (
    <Box sx={{ display: "grid" }}>
      <Typography>Trade Transaction</Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={holdings}
          columns={columnsRaw}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Box>
        <Button onClick={filterByDate}>Filter</Button>
      </Box>
      <Box sx={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rowsSummary}
          columns={columnsSummary}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Row1;
