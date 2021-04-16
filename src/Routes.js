import React from "react";
import { Router } from "@reach/router";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import AddProfile from "./Pages/AddProfile/AddProfile";
import CreateNewBook from "./Pages/CreateNewBook";
import Reading from "./Pages/Reading/Reading";
import SearchResult from "./Pages/SearchResult";
import GenreSearch from "./Pages/GenreSearch";
import Admin from "./Pages/Admin/Admin";

export default function Routes(props) {
  return (
    <Router>
      <Home path="/" />
      <Profile path="/profile/:email" />
      <AddProfile path="/editprofile" />
      <Home path="*" />
      <CreateNewBook path="/edit/:roomID" />
      <Reading path="/view/:bookID" />
      <GenreSearch path="/genres/:genre" />
      <SearchResult path="/search/:value" />
      <Admin path="/admin" />
    </Router>
  );
}
