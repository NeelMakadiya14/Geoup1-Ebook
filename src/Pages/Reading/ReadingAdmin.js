import React from "react";
import ReadingThread from "../../components/ReadingThread";
import MyAppBar from "../../components/MyAppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import axios from "axios";


export default function Reading(props) {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  
  const approve = () => {
    console.log("Approved");
    const obj = {
      docID: props.data.docID,
    };
    console.log(obj);
    axios
      .post(`${API_URL}/publish`, obj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

      axios.delete(`${API_URL}/pendingrequest`, { params: { id: obj } })
  };

  const reject = () =>{
      //do this when book is rejected
  };

  return (
    <div>
      <MyAppBar />
      <Toolbar />
      <ReadingThread bookID={props.bookID} />
      <div style={{display:"flex"}}>

      <Button
        onClick={approve}    
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
        onClick={reject}    
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
    </div>
  );
}
