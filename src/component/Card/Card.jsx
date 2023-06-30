import "./../../Card.css";
import { useState } from "react";
import axios from "axios";
import { BsArrowRight } from "react-icons/bs";

function Card() {
  const [quote, setQuote] = useState("Here is your daily quote");
  const [index, setIndex] = useState("");
  const [error, setError] = useState(null);

  function handleClick() {
    setQuote("Loading...");

    axios
      .get("https://type.fit/api/quotes")
      .then((response) => {
        const quotes = response.data;
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex].text;
        setQuote(randomQuote);
        setIndex(randomIndex);
        setError(null); // Reset error state on successful response
      })
      .catch((error) => {
        console.log("Error:", error);
        setError("There was an error, please try again");
        setIndex('')
      });
  }
  return (
    <div className="App">
      <div className="container">
        <div className="quote-num">{error ? 'Quote #' : `Quote #${index}`}</div>
        <div className="quote">
          <h1>{error ? `" ${error} "` : `" ${quote} "`}</h1>
        </div>
        <div className="button-container">
          <button onClick={handleClick}>
            Next Quote <BsArrowRight className="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
