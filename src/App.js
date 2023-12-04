import "./App.css";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Uppgift from "./pages/Uppgift";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="uppgift" element={<Uppgift />}>
          <Route path=":id"></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
