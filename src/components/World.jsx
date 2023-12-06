import React, { useEffect, useState } from "react";
import Country from "./Country";
import { Link } from "react-router-dom";
import CCard from "./CCard";
import { Col, Row } from "react-bootstrap";
import CountryList from "./CountryList";

const World = ({ worldInfo, setLives, lives, unlocked }) => {
  const [count, setCount] = useState(2);
  const [showHint, setShowHint] = useState(false);
  const [guess, setGuess] = useState({ country: "", city: "" });
  const [rightAnswer, setRightAnswer] = useState({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [correctCountries, setCorrectCountries] = useState([]);
  useEffect(() => {}, [showHint]);

  const handleGuess = () => {
    if (rightAnswer) {
      let cityGuess = guess.city.toLowerCase();
      let countryGuess = guess.country.toLowerCase();
      let rightCity = rightAnswer.city.toLowerCase();
      let rightCountry = rightAnswer.country.toLowerCase();

      if (!cityGuess || !countryGuess) {
        alert("Insert values to guess");
      } else if (guess) {
        let userAnswer = cityGuess.trim() + countryGuess.trim();
        let correctAnswer = rightCity.trim() + rightCountry.trim();
        userAnswer === correctAnswer
          ? youAreCorrect(countryGuess)
          : youAreIncorrect();
      } else {
        console.log("else");
      }
    }
  };
  //Rätt svar -> fixa streaks, gå till nästa land, adda ett land
  const youAreCorrect = (country) => {
    alert("CORRECT! + 100 points and country added!");
    setScore((prev) => prev + 10);
    setStreak((prev) => prev + 1);
    streak >= longestStreak && setLongestStreak((prev) => prev + 1);
    count > 0 &&
      count < worldInfo.length - 1 &&
      document.querySelector("#increment-button").click();
    setCorrectCountries((prev) => [...prev, country]);
  };
  //Hantering av olika felsvar
  const youAreIncorrect = () => {
    if (
      guess.city !== rightAnswer.city &&
      guess.country !== rightAnswer.country
    ) {
      alert("Try again");
    } else if (guess.city === rightAnswer.city) {
      alert("Only city is correct.");
    } else {
      alert("Only country is correct.");
    }
    setLives((prev) => prev - 1);
    setStreak(0);
  };
  const guessInput = (e, part) => {
    const { value } = e.target;
    setGuess({ ...guess, [part]: value });
  };
  useEffect(() => {
    console.log(guess);
  }, [count, guess]);
  //Addar windowevents här
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
    setLives(10);
    window.addEventListener("keydown", keyPress);
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  }, []);
  return (
    <>
      <header style={{ display: "flex" }}>
        <div>
          <button
            id="decrement-button"
            onClick={() => {
              setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
            }}
          >
            Prev
          </button>
          <button
            id="increment-button"
            onClick={() => {
              setCount((prevCount) =>
                prevCount < worldInfo.length - 1 ? prevCount + 1 : prevCount
              );
            }}
          >
            Next
          </button>
          <h2>Score: {score * 10}</h2>
          <h3>
            Life:
            <progress max={10} value={lives}></progress>
          </h3>
          <h4> Country: {count + 1}</h4>
          <h4>Streak: {streak}</h4>
          <h5>Longest streak: {longestStreak}</h5>
        </div>
        <div style={{ marginLeft: "30%" }}>
          <article>
            <h3>Hej Brandon! Gjorde ett halvtrasigt flaggspel.</h3>
            <p>
              Det går att styra med höger och vänster pilarna. Det går också att
              trycka enter för att registrera ditt svar! Svarar du rätt på både
              land och huvudstad får du 100 poäng och landet addas längst ner
              med lite info. Om du vill hoppa detta och gå vidare för den
              ursprungliga uppgiften har du en länk till den{" "}
              <Link to="uppgift">här</Link>
            </p>
          </article>
        </div>
      </header>
      <div className="europa-layout">
        <section>
          <h1>Welcome!</h1>
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
                      setGuess,
                    }}
                    info={x}
                  />
                ))
                .filter((x, i) => {
                  return i === count;
                })}
          </div>
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
      <section className="correct-countries">
        {worldInfo &&
          worldInfo
            .filter((x) => {
              let name = x.name.common.toLowerCase();
              return correctCountries.includes(name);
            })
            .map((x) => (
              <div>
                <CCard info={x} />
              </div>
            ))}
      </section>
    </>
  );
};

export default World;
