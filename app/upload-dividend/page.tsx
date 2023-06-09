"use client";

import React from "react";
import CSVUploader from "../(shared)/CSVUploader";
import { CSVData } from "../types";
import { columnHeadersDividendIB } from "../columnHeaders";
import { Box, Typography, useMediaQuery } from "@mui/material";

const UploadDividend = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleDataParsed = async (dataToCreate: CSVData[]) => {
    try {
      // await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/holding`, { data: postData });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/dividend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: dataToCreate }),
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
      p="10px"
      m="10px"
      gridTemplateColumns="repeat(1, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <Typography sx={{ fontWeight: "bold" }} m="10px">
        Upload dividend
      </Typography>
      <CSVUploader
        fileType="dividend"
        columnHeaders={columnHeadersDividendIB}
        onDataParsed={handleDataParsed}
      />
    </Box>
  );
};

export default UploadDividend;
