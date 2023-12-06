import React, { useEffect, useState } from "react";
import CCard from "./CCard";

const CountryList = ({ worldData, unlocked }) => {
  useEffect(() => {
    console.log("world ender", worldData);
  }, []);
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "70vh",
          backgroundColor: "lightyellow",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {worldData &&
          worldData.map((x) => <CCard info={x} unlocked={unlocked} />)}
      </div>
    </>
  );
};

export default CountryList;
