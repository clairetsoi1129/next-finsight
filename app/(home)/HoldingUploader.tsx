"use client";

import React from "react";
import CSVUploader from "../(shared)/CSVUploader";
import { CSVData } from "../types";
import { columnHeadersTradeIB } from "../columnHeaders";

const HoldingUploader = () => {
  const handleDataParsed = async (dataToCreate: CSVData[]) => {
    // Do something with the parsed data
    console.log(dataToCreate);

    try {
      // await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/holding`, { data: postData });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/holding`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: dataToCreate }),
        }
      );

      console.log("Data inserted into PostgreSQL");
    } catch (error) {
      console.error("Error inserting data into PostgreSQL:", error);
    }
  };

  return (
    <div>
      <h1 className="head_text text-left px-5">
        <span className="blue_gradient">Upload Holding</span>
      </h1>
      <p className="desc text-left max-w-md px-5">
        Upload the holdings in your portfolio
      </p>

      <CSVUploader
        columnHeaders={columnHeadersTradeIB}
        onDataParsed={handleDataParsed}
      />
    </div>
  );
};

export default HoldingUploader;
