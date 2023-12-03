import React, { useEffect, useState } from "react";
import Country from "./Country";

const World = ({ worldInfo }) => {
  const [count, setCount] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [guess, setGuess] = useState({ country: "", city: "" });
  const [rightAnswer, setRightAnswer] = useState({});
  const [score, setScore] = useState(0);
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
      if (!guess.city || !guess.country) {
        alert("Insert values to guess");
      } else if (guess) {
        let userAnswer =
          guess.city.toLowerCase().trim() + guess.country.toLowerCase().trim();
        let correctAnswer =
          rightAnswer.city.toLowerCase().trim() +
          rightAnswer.country.toLowerCase().trim();
        userAnswer === correctAnswer ? youAreCorrect() : youAreIncorrect();
      } else {
        console.log("else");
      }
    }
  };
  const youAreCorrect = () => {
    alert("CORRECT");
    count > 0 && document.querySelector("#increment-button").click();
  };

  const youAreIncorrect = () => {
    guess.city !== rightAnswer.city && guess.country !== rightAnswer.country
      ? alert("Try again")
      : guess.city === rightAnswer.city
      ? alert("Only city is correct.")
      : guess.country === rightAnswer.country &&
        alert("Only country is correct.");
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
      if (e.key === "ArrowLeft" && count > 0) {
        document.querySelector("#decrement-button").click();
      } else if (e.key === "ArrowRight") {
        document.querySelector("#increment-button").click();
      } else if (e.key === "Enter") {
        console.log(e.key);
        handleGuess();
      }
    };

    window.addEventListener("keydown", keyPress);

    return () => {
      window.removeEventListener("keydown", keyPress);
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
      <div>Score: {score * 10}</div>
      Country: {count}
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
                  {...{
                    showHint,
                    guessInput,
                    setRightAnswer,
                    rightAnswer,
                    setShowHint,
                  }}
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
