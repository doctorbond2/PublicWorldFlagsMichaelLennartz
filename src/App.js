import "./App.css";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Uppgift from "./pages/Uppgift";
import { Routes, Route } from "react-router";
import CountryInfo from "./components/CountryInfo";
function App() {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home {...{ unlocked, setUnlocked }} />} />
        <Route
          path="uppgift"
          element={<Uppgift {...{ unlocked, setUnlocked }} />}
        >
          <Route path=":id" element={<CountryInfo />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
