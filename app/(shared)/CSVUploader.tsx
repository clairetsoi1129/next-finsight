"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { CSVData } from "../types";
import csvParser from "csv-parser";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { FilePondFile } from "filepond";
// Register the necessary plugins for FilePond
registerPlugin();

type CSVUploaderProps = {
  columnHeaders: string[];
  onDataParsed: (data: CSVData[], filename: string) => void;
  fileType: string;
};

const CSVUploader: React.FC<CSVUploaderProps> = ({
  columnHeaders,
  onDataParsed,
  fileType,
}) => {
  const filePondRef = useRef<FilePond>(null);

  const handleFileUpload = async () => {
    const files = filePondRef.current?.getFiles();
    if (files && files.length > 0) {
      try {
        const file = files[0].file;
        const csvString = await file.text();
        const parsedData = await parseCSV(csvString, fileType);
        onDataParsed(parsedData, file.name);
      } catch (error) {
        console.error("Error parsing CSV:", error);
      }
    }
  };

  const parseCSV = (
    csvString: string,
    fileType: string
  ): Promise<CSVData[]> => {
    return new Promise((resolve, reject) => {
      const data: CSVData[] = [];

      let skip = 0;
      if (fileType === "yearlyExchangeRate") {
        skip = 1;
      }

      const parser = csvParser({
        skipLines: skip,
        mapHeaders: ({ header }) =>
          header.toUpperCase().trim().replace(/"/g, ""),
      });

      parser
        .on("data", (entry) => {
          data.push(entry);
        })
        .on("end", () => {
          resolve(data);
        })
        .on("error", (error) => {
          reject(error);
        });

      parser.write(csvString);
      // console.log(`csvString:${csvString}`);
      parser.end();
    });
  };

  return (
    <div>
      <FilePond ref={filePondRef} acceptedFileTypes={[".csv"]} />
      <button onClick={handleFileUpload} className="btn btn-primary">
        Upload {fileType}
      </button>
    </div>
  );
};

export default CSVUploader;
