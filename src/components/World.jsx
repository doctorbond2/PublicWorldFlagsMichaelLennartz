import React, { useEffect, useState } from "react";
import Country from "./Country";

const World = ({ worldInfo }) => {
  const [count, setCount] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [guess, setGuess] = useState({ country: "", city: "" });
  const [rightAnswer, setRightAnswer] = useState({});
  useEffect(() => {}, [showHint]);
  useEffect(() => {
    if (count < 1) {
      setCount(0);
    } else if (count >= worldInfo.length - 1) {
      setCount(worldInfo.length - 1);
    }
  }, [count]);
  const handleGuess = () => {
    if (rightAnswer) {
      let userAnswer = (guess.city + guess.country).toLowerCase();
      let correctAnswer = (
        rightAnswer.city + rightAnswer.country
      ).toLowerCase();
      userAnswer === correctAnswer ? alert("CORRECT") : alert("no...");
    }
  };
  const guessInput = (e, part) => {
    const { value } = e.target;
    setGuess({ ...guess, [part]: value });
    console.log(guess);
  };
  useEffect(() => {
    const keyPress = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
      }
      if (e.key === "ArrowLeft") {
        document.querySelector("#decrement-button").click();
      } else if (e.key === "ArrowRight") {
        document.querySelector("#increment-button").click();
      }
    };
    const enterPress = (e) => {
      e.key === "Enter" && handleGuess();
    };
    window.addEventListener("keydown", keyPress);
    window.addEventListener("keydown", enterPress);
    return () => {
      window.removeEventListener("keydown", keyPress);
      window.removeEventListener("keydown", enterPress);
    };
  }, []);
  return (
    <>
      <button
        id="decrement-button"
        onClick={(e) => {
          setCount(count - 1);
        }}
      >
        Dec
      </button>
      <button
        id="increment-button"
        onClick={(e) => {
          setCount(count + 1);
        }}
      >
        Inc
      </button>

      {count}
      <div className="europa-layout">
        <div>Welcome!</div>
        <button
          onClick={() => {
            setShowHint(!showHint);
            console.log(showHint);
          }}
        >
          {showHint ? "Hide hint" : "Show hint"}
        </button>
        <button onClick={handleGuess}>Answer!</button>

        <div>
          {worldInfo &&
            worldInfo
              .map((x) => (
                <Country
                  {...{ showHint, guessInput, setRightAnswer, rightAnswer }}
                  info={x}
                />
              ))
              .filter((x, i) => {
                return i === count;
              })}
        </div>
      </div>
    </>
  );
};

export default World;
