import React from "react";
import World from "../components/World";
import { useState, useEffect } from "react";
import Home from "./Home";
import CountryList from "../components/CountryList";
import { Link } from "react-router-dom";

const Uppgift = ({ unlocked, setUnlocked }) => {
  const [showWorld, setShowWorld] = useState(false);
  const [chosenWorld, setChosenWorld] = useState("");
  const [worldData, setWorldData] = useState(null);
  const handleClick = () => {
    chosenWorld && setShowWorld(!showWorld);
  };
  useEffect(() => {
    if (chosenWorld) {
      const fetchData = async () => {
        const response = await fetch(
          "https://restcountries.com/v3.1/region/" + chosenWorld
        );
        const json = await response.json();
        setWorldData(json);
        console.log(json);
      };
      fetchData();
    }
  }, [chosenWorld]);
  return (
    <>
      <button
        onClick={() => {
          handleClick();
          setUnlocked(true);
        }}
      >
        Show the World
      </button>

      <select
        placeholder="CHOOSE"
        onChange={(e) => {
          setChosenWorld(e.target.value);
        }}
      >
        <option default disabled selected>
          Choose!
        </option>
        <option value={"africa"}>Afrika</option>
        <option value={"europe"}>Europa</option>
        <option value={"asia"}>Asien</option>
      </select>
      <Link to="/">Flaggame</Link>
      {showWorld && worldData && <CountryList {...{ worldData, unlocked }} />}
    </>
  );
};

export default Uppgift;
