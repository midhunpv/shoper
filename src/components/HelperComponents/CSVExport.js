import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const dataObjectLength = csvData.length;
  const dataArrayLength = csvData[0].length;

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData[0]);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  console.log(dataObjectLength, dataArrayLength);
  if (dataObjectLength !== 0) {
    if (dataArrayLength !== 0) {
      return (
        <div className="right floated" data-inverted=""   data-position="left center"  data-tooltip="Export Cart items as Excel">
          <i
            onClick={(e) => exportToCSV(csvData, fileName)}
            className="circular download blue icon"
          ></i>
        </div>
      );
    } else {
      return <div></div>;
    }
  } else {
    return <div></div>;
  }
};
