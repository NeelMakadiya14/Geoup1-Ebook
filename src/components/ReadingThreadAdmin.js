import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Button from "@material-ui/core/Button";
import axios from "axios";

require("dotenv").config();

export default function ReadingThreadAdmin(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });


  

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const ClickMe = () => {
    console.log("Approved");
    axios.delete(`${API_URL}/pendingrequest`, props.bookID)
	.then(res => console.log(res.data));
  };

  return (
    <>
      <div className="main">
        <div className="buttonc">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="Pre"
          >
            Previous
            </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
            </button>
        </div>
        <Document style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          file={`${API_URL}/book?docID=${props.bookID}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <div className="pagec">
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
        </div>
      </div>

      <div style={{display:"flex"}}>

      <Button
        onClick={ClickMe}    
        style = {{
          fontSize: "20",
          height: "35",
          width: "100",
          margin: "20px",

        }}
        color="primary"
        variant="contained"
        disableElevation
        >
        Approve
      </Button>
    
      <Button
        onClick={ClickMe}    
        style = {{
          fontSize: "20",
          height: "35",
          width: "100",
          margin: "20px",

        }}
        color="primary"
        variant="contained"
        disableElevation
        >
        Reject
      </Button>
    </div>
    </>
  );
}
