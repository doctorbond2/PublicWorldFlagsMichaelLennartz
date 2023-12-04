import React, { useEffect, useState } from "react";
import Country from "./Country";

const World = ({ worldInfo }) => {
  const [count, setCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [guess, setGuess] = useState({ country: "", city: "" });
  const [rightAnswer, setRightAnswer] = useState({});
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  useEffect(() => {}, [showHint]);

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
    setScore((prev) => prev + 10);
    setStreak((prev) => prev + 1);
    streak >= longestStreak && setLongestStreak(streak);
    count > 0 &&
      count < worldInfo.length - 1 &&
      document.querySelector("#increment-button").click();
  };

  const youAreIncorrect = () => {
    guess.city !== rightAnswer.city && guess.country !== rightAnswer.country
      ? alert("Try again")
      : guess.city === rightAnswer.city
      ? alert("Only city is correct.")
      : guess.country === rightAnswer.country &&
        alert("Only country is correct.");
    setStreak(0);
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
        document.querySelector(".answer-button").click();
      }
    };
    window.addEventListener("keydown", keyPress);
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  }, []);
  return (
    <>
      <header>
        <button
          id="decrement-button"
          onClick={(e) => {
            count > 0 && setCount(count - 1);
          }}
        >
          Dec
        </button>
        <button
          id="increment-button"
          onClick={(e) => {
            count < worldInfo.length - 1 && setCount(count + 1);
          }}
        >
          Inc
        </button>
        <h2>Score: {score * 10}</h2>
        <h3>
          Lives: {lives}
          <progress max={10} value={lives}></progress>
        </h3>
        <h4> Country: {count + 1}</h4>
        <h4>Streak: {streak}</h4>
        <h5>Longest streak: {longestStreak}</h5>
      </header>
      <div className="europa-layout">
        <section>
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
          <div>Welcome!</div>
          <div className="buttonz">
            <button
              className="buttonz-x"
              onClick={() => {
                setShowHint(!showHint);
                console.log(showHint);
              }}
            >
              {showHint ? "Hide hint" : "Show hint"}
            </button>
            <button className="buttonz-x answer-button" onClick={handleGuess}>
              Answer!
            </button>
          </div>
        </section>
      </div>
      <section className="all-flags">asd</section>
    </>
  );
};

export default World;
