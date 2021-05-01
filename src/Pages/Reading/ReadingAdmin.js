import React from "react";
import ReadingThreadAdmin from "../../components/ReadingThreadAdmin";
import MyAppBar from "../../components/MyAppBar";
import Comments from "../../components/CommentThread/Comments";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import axios from "axios";


export default function Reading(props) {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  
  const ClickMe = () => {
    console.log("Approved");
    const obj = {
      docID: props.data.docID,
    };
    console.log(obj);
    axios
      .post(`${API_URL}/publish`, obj)
      .then((res) => {
        console.log(res);
          var tempList = props.checkList;
          tempList[props.data.docID] = true;
          props.setCheckList(tempList);
          props.setRender(!props.render);
      })
      .catch((err) => console.log(err));

      axios.delete(`${API_URL}/pendingrequest`, { params: { id: obj } })
  };

  return (
    <div>
      <MyAppBar />
      <Toolbar />
      <ReadingThreadAdmin bookID={props.bookID} />
      {/* <Button
      
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
                </Button> */}
    </div>
  );
}
