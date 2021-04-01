import React from "react";
import Routes from "./Routes.js"
import ReadingThread from "./components/ReadingThread.js"
require("dotenv").config();

export default function App() {
  return (
    <div>
      <Routes />
      <ReadingThread />
    </div>
  );
}
