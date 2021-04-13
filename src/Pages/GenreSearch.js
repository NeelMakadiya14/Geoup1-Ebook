import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import Loader from "../components/Loader";
import MyAppBar from "../components/MyAppBar";
import Search from "../components/Search";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Postcard from "../components/Postcard";
import { Grid, Box } from "@material-ui/core";

require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function GenreSearch(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const [len, setLen] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/home/genres?` +
          queryString.stringify({ genre: props.genre })
      )
      .then((res) => {
        console.log("get : ", res.data);
        setData(res.data);
        setLen(res.data.length);
        //console.log("Number of items: ",len);
        // console.log("output: ",data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.content}>
      <MyAppBar />
      <Toolbar />
      <Search />
      {data ? (
        <div>
          <Box display="flex" justifyContent="center">
            {/* <h1 style={{ marginLeft: "15px" }}> Results found : {len} </h1> */}
            <Grid container spacing={2} style={{ width: "78vw" }}>
              {data.map((x, i) => (
                <Grid item xs={12} sm={6} md={3} lg={2}>
                  <Postcard data={x} key={i} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
