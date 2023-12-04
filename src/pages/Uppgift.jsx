import React from "react";
import World from "../components/World";
import { useState, useEffect } from "react";
import Home from "./Home";
import CountryList from "../components/CountryList";
import { Link } from "react-router-dom";

const Uppgift = () => {
  const [showWorld, setShowWorld] = useState(false);
  const [chosenWorld, setChosenWorld] = useState("");
  const [worldData, setWorldData] = useState(null);
  const [lives, setLives] = useState(1);
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
          setLives(10);
          handleClick();
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
      <Link>asd</Link>
      {showWorld && worldData && <CountryList {...{ worldData }} />}
    </>
  );
};

export default Uppgift;
