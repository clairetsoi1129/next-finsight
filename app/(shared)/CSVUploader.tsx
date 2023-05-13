"use client";

import React, { ChangeEvent, useState } from "react";
import { CSVData } from "../types";
import csvParser from "csv-parser";

type CSVUploaderProps = {
  columnHeaders: string[];
  onDataParsed: (data: CSVData[]) => void;
};

const CSVUploader: React.FC<CSVUploaderProps> = ({
  columnHeaders,
  onDataParsed,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const csvString = await selectedFile.text();
        const parsedData = await parseCSV(csvString);
        onDataParsed(parsedData);
      } catch (error) {
        console.error("Error parsing CSV:", error);
      }
    }
  };

  const parseCSV = (csvString: string): Promise<CSVData[]> => {
    return new Promise((resolve, reject) => {
      const data: CSVData[] = [];

      const parser = csvParser({
        mapHeaders: ({ header }) => header.replace(/"/g, ""),
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
      parser.end();
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
};

export default CSVUploader;
