import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import Loader from "../components/Loader";
import MyAppBar from "../components/MyAppBar";
import Search from "../components/Search";
require("dotenv").config();

export default function SearchResult(props) {
  const [data, setData] = useState([]);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/search?` + queryString.stringify({ name: props.value }))
      .then((res) => {
        console.log("get : ", res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <MyAppBar />
      <Search />
      {data ? <h1>Show Result</h1> : <Loader />}
    </div>
  );
}
