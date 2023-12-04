import React, { useEffect } from "react";

const CountryList = ({ worldData }) => {
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
        }}
      >
        asd
      </div>
    </>
  );
};

export default CountryList;
