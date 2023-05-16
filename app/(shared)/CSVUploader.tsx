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
  onDataParsed: (data: CSVData[]) => void;
};

const CSVUploader: React.FC<CSVUploaderProps> = ({
  columnHeaders,
  onDataParsed,
}) => {
  const filePondRef = useRef<FilePond>(null);

  const handleFileUpload = async () => {
    const files = filePondRef.current?.getFiles();
    if (files && files.length > 0) {
      try {
        const file = files[0].file;
        const csvString = await file.text();
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
    <div className="mx-10">
      <FilePond ref={filePondRef} acceptedFileTypes={[".csv"]} />
      <button onClick={handleFileUpload} className="btn btn-primary">
        Upload
      </button>
    </div>
  );
};

export default CSVUploader;
