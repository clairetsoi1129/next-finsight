"use client";

import React, { useState } from "react";
import CSVUploader from "../(shared)/CSVUploader";
import { CSVData } from "../types";
import { columnHeadersYearlyExchangeRate } from "../columnHeaders";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Typography, useMediaQuery } from "@mui/material";

const UploadYearlyExchangeRate = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

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
      display="grid"
      gap="15px"
      p="1"
      m="1"
      gridTemplateColumns="repeat(1, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <Typography sx={{ fontWeight: "bold" }} m="10px">
        Upload Yearly Exchange Rate
      </Typography>
      <Box
        display="grid"
        gap="15px"
        m="10px"
        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
        display="grid"
        gap="15px"
        m="10px"
        gridTemplateColumns="repeat(1, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <CSVUploader
          columnHeaders={columnHeadersYearlyExchangeRate}
          onDataParsed={handleDataParsed}
          fileType="yearlyExchangeRate"
        />
      </Box>
    </Box>
  );
};

export default UploadYearlyExchangeRate;
