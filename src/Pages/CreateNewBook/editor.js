

import React, { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { CookiesProvider, Cookies, useCookies } from "react-cookie";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import MyAppBar from "../../components/MyAppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import queryString from "query-string";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import axios from "axios";

import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

require("dotenv").config();

const API_URL = process.env.REACT_APP_BACKEND_URL;

const cookies = new Cookies();
const userCookie = cookies.get("userCookie");

const username = userCookie.name;
const email = userCookie.email;

let docID = window.location.pathname;
docID = docID.substring(6);



export default function Room(props) {
  const roomID = props.roomID;
  Quill.register("modules/cursors", QuillCursors);
  //const ImageResize = require('quill-image-resize-module').default
  //Quill.register('modules/imageResize', ImageResize);
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(
    "wss://demos.yjs.dev",
    `${roomID}`,
    ydoc
  );
  const type = ydoc.getText(`${roomID}`);
  var htmlContent = document.getElementsByClassName("ql-editor");

  const [chapters, setChapters] = useState([]);


  useEffect(async () => {
    const EditorContainer = document.getElementById("editor");
    var toolbarOptions = [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      ["blockquote", "link", "image", "video", "code-block"],
      ["formula"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ direction: "rtl" }], // text direction
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      ["clean"],
    ];
    var editor = new Quill(EditorContainer, {
      modules: {
        cursors: true,
        toolbar: toolbarOptions,
        history: {
          userOnly: true,
        },
      },
      placeholder: "Start Writing...",
      theme: "snow", // or 'bubble'
      // onChange: { rteChange },
      // value: { state.comments || '' },

    });
    const binding = new QuillBinding(type, editor, provider.awareness);
    console.log(provider.awareness);
    if (!username) username = "Anonymous";
    provider.awareness.setLocalStateField("user", {
      name: `${username}`,
      color: "blue",
    });

    // @ts-ignore
    window.example = { provider, ydoc, type, binding, Y };

    await axios
      .get(`${API_URL}/bookbyid?` + queryString.stringify({ docID }))
      .then((res) => setChapters(res.data.chapters)
      );

  }, []);



  const OnSave = async () => {
    console.log(API_URL);
    // var pdf = new jsPDF();
    // html2pdf(pdf);
    var final = htmlContent.item(0);
    // var pdf = html2pdf().from(final);
    html2pdf()
      .from(final)
      .outputPdf("blob")
      .then((result) => {
        var data = new FormData();
        data.append("book", result);

        var requestOptions = {
          method: "POST",
          body: data,
          redirect: "follow",
        };

        fetch(
          `${API_URL}/uploadbook?` + queryString.stringify({ docID: roomID }),
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      });

    // pdf.fromHTML(htmlContent.item(0), 0, 0, { width: 100 }, function () {
    //   var blob = pdf.output("blob");
    //   var data = new FormData();
    //   data.append("book", blob);

    //   var requestOptions = {
    //     method: "POST",
    //     body: data,
    //     redirect: "follow",
    //   };

    //   fetch(
    //     `http://localhost:5001/uploadbook?` +
    //       queryString.stringify({ docID: roomID }),
    //     requestOptions
    //   )
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.log("error", error));
    // });
    // pdf.save("pdf");
  };

  let id = window.location.pathname;
  id = id.substring(6);

  const AddCollabator = () => {
    let foo = prompt('Type here email of collabator');
    if (foo !== null) {
      const obj = {
        email: foo
      }

      axios.post(`${API_URL}/addeditor?` + queryString.stringify({ docID: id }), obj)
        .then((res) => console.log(res))
    }
  }

  const AddChapter = async () => {
    let foo = prompt('Add new chapter');
    if (foo !== null) {
      const obj = {
        cname: foo
      }

      await axios.post(`${API_URL}/addchapter?` + queryString.stringify({ docID: id }), obj)
        .then((res) => console.log(res))

      setChapters([...chapters,foo]);
      console.log(chapters);
    }
  }

  return (
    <div>
      <MyAppBar />
      <Toolbar />
      <div style={{ display: "flex" }}>


        <Grid item xs={2} style={{ height: 100 + "%" }}>
          <Card>
            <div>
              <h1> Chapters </h1>
              <List>
              {chapters.map ( (chapter) => (
                <ListItem>
                  <ListItemText
                    primary={chapter}
                  />
                </ListItem>
              )) 
              }
              </List>
            </div>
          </Card>
        </Grid>

        <Grid item xs={10} style={{ height: 100 + "%" }}>
          <Card>
            <div
              style={{
                boxShadow:
                  // "0 4px 8px 0 rgba(100, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 100, 0, 0.19)",
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
              }}
              id="editor"
            ></div>
          </Card>
        </Grid>


      </div>

      <div
        style={{
          padding: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >


        <Button variant="contained" color="primary" onClick={AddCollabator}>
          Add collabator
        </Button>

        <Button variant="contained" color="primary" style={{ marginLeft: 5 }} onClick={AddChapter}>
          Add Chapter
        </Button>

        <Button variant="contained" color="primary" style={{ marginLeft: 5 }} onClick={OnSave}>
          Submit
        </Button>

      </div>
    </div>
  );
}
