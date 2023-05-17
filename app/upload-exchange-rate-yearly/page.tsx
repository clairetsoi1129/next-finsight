"use client";

import React, { useState } from "react";
import CSVUploader from "../(shared)/CSVUploader";
import { CSVData } from "../types";
import { columnHeadersYearlyExchangeRate } from "../columnHeaders";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box } from "@mui/material";

const UploadYearlyExchangeRate = () => {
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const convertEndDate = (dateString: string) => {
    // const dateString = 'Average for the year to 31 March 2023';
    const formattedDate = new Date(
      dateString.replace("Average for the year to ", "")
    );

    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();
    const year = formattedDate.getFullYear();
    const date = `${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}-${year}`;
    return date;
  };

  const handleDataParsed = async (dataToCreate: CSVData[]) => {
    // Do something with the parsed data
    console.log(dataToCreate);

    try {
      // await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/holding`, { data: postData });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/exchangeRate/yearly`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
            data: dataToCreate,
          }),
        }
      );

      if (response.ok) {
        console.log("Data inserted into PostgreSQL");
      } else {
        console.error(
          "Error inserting data into PostgreSQL. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error inserting data into PostgreSQL:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Effective Start Date
          </span>
          <DatePicker
            dateFormat="MM/dd/yyyy"
            selected={startDate}
            className="form_input"
            onChange={(date) => {
              date && setStartDate(date);
            }}
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Effective End Date
          </span>
          <DatePicker
            dateFormat="MM/dd/yyyy"
            selected={endDate}
            className="form_input"
            onChange={(date) => {
              date && setEndDate(date);
            }}
          />
        </label>
      </Box>
      <Box
        sx={{
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <CSVUploader
          columnHeaders={columnHeadersYearlyExchangeRate}
          onDataParsed={handleDataParsed}
          fileType="exchangeRate"
        />
      </Box>
    </Box>
  );
};

export default UploadYearlyExchangeRate;
