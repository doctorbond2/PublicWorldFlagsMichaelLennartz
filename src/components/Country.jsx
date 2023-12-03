import React, { useEffect, useState } from "react";

const Country = ({
  info,
  showHint,
  guessInput,
  setRightAnswer,
  rightAnswer,
}) => {
  useEffect(() => {
    setShowInfo(false);
    setRightAnswer({ country: common, city: capital[0] });
    console.log("Right Answer:", rightAnswer);
  }, [info]);

  const [showInfo, setShowInfo] = useState(false);
  const {
    flags: { png },
    capital,
    name: { common },
  } = info;
  return (
    <>
      <div className="country-wrap">
        <div>
          <header>
            <div onClick={() => setShowInfo(!showInfo)} className="flag-image">
              <img src={png} />
            </div>
          </header>
        </div>
        <div className="input-style">
          {showInfo ? (
            <div>
              <h3>{common}</h3>
              <br></br>
              <p>{capital && capital[0]}</p>
            </div>
          ) : showHint ? (
            <>
              <h3>Country: {common.slice(0, 3)}...</h3>
              <br></br>
              <h3>City: {capital && capital[0].slice(0, 3)}...</h3>
            </>
          ) : (
            <>
              <input
                placeholder="Country?"
                type="text"
                onChange={(e) => {
                  guessInput(e, "country");
                }}
              ></input>
              <input
                placeholder="City?"
                type="text"
                onChange={(e) => {
                  guessInput(e, "city");
                }}
              ></input>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Country;