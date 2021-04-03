import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import Loader from "../components/Loader";
import MyAppBar from "../components/MyAppBar";
import Search from "../components/Search";
import Toolbar from "@material-ui/core/Toolbar";

require("dotenv").config();

export default function GenreSearch(props) {
  const [data, setData] = useState([]);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(
        `${API_URL}/home/genres?` +
          queryString.stringify({ genre: props.genre })
      )
      .then((res) => {
        console.log("get : ", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <MyAppBar />
      <Toolbar />
      <Search />
      {data ? <h1>Show Result</h1> : <Loader />}
    </div>
  );
}
