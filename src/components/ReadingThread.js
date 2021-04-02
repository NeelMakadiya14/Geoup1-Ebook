import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// const ReadingThread=()=>{
// const url =
//   "https://e-book-backend.herokuapp.com/book?docID=1234abcd.pdf"


export default function Test() {

  const [url, setUrl] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    console.log("JAY");
    fetchTasks().then((info) => { setUrl(info); console.log(url) })
    // setUrl(tasksFromServer)
    // console.log("server")

    // if (cookies.get('userDetails')) {
    //   name = cookies.get('userDetails').name;
    //   //userId = cookies.get('userDetails')._id;
    //   username = cookies.get('userDetails').username;
    // }

  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    console.log("JAY1");
    const res = await fetch('http://www.africau.edu/images/default/sample.pdf', { method: 'Get' })
    const data = await res.json()

    console.log("jay2", data)
    return data
  }

  pdfjs.GlobalWorkerOptions.workerSrc =
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <div className="main">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <div className="pagec">
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </div>
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
        </div>
      </div>
    </>
  );
}