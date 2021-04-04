import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import Loader from "../components/Loader";
import MyAppBar from "../components/MyAppBar";
import Search from "../components/Search";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Postcard from "../components/Postcard";
import Grid from '@material-ui/core/Grid';


require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function SearchResult(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const[len,setLen]=useState(0); 

  useEffect(() => {
    axios
      .get(`${API_URL}/search?` + queryString.stringify({ name: props.value }))
      .then((res) => {
        console.log("get : ", res.data);
        setData(res.data);
        setLen(res.data.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.content}>
      <MyAppBar />
      <Toolbar />
      <Search />
      {data ? <div>
        <h1 style={{marginLeft:"15px"}}>Results found : {len} </h1>
        
        <Grid container spacing={2}>
            {data.map((x,i) =>
              
              <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Postcard data={x} key={i} style={{height:"20px", width:"20px"}}/>
              </Grid>
            )}
             </Grid>
          
      </div>
      : <Loader />}
    </div>
  );
}
