import { useState } from "react";
import "./App.css";

function App() {
  let randomNum = Math.floor(Math.random() * 100) + 1;
  const [userGuess, setUserGuess] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [userAllGuessesValue, setUserAllGuessesValue] = useState([]);
  const [randomNumber, setRandomNumber] = useState(randomNum);
  const [msg, setMsg] = useState("");
  const [disbled, setDisbled] = useState(false);
  const [lowOrHigh, setLowOrHigh] = useState("");
  const [showRandomNumber, setShowRandomNumber] = useState(false);

  const handleValue = (e) => {
    setUserGuess(e.target.value);
  };

  const handleSubmit = () => {
    if (!userGuess) {
      setMsg("Please input any number.");
      return;
    }
    if (+randomNumber === +userGuess) {
      setMsg("Congratulations!!!");
      setDisbled(true);
      setLowOrHigh("");
    } else if (+userCount === 4) {
      setMsg("Game Over");
      setDisbled(true);
      setLowOrHigh("");
    } else {
      setMsg("Wrong Guess");
      if (randomNumber < userGuess) {
        setLowOrHigh("selected value is high");
      }
      if (randomNumber > userGuess) {
        setLowOrHigh("selected value is low");
      }
    }
    setUserCount(userCount + 1);
    setUserAllGuessesValue([...userAllGuessesValue, userGuess]);
    setUserGuess(""); // Clear the input field
  };

  const restartAgain = () => {
    setDisbled(false);
    setMsg("");
    setUserAllGuessesValue([]);
    setUserCount(0);
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setUserGuess("");
    setLowOrHigh("");
  };

  const toggleRandomNumber = () => {
    setShowRandomNumber(!showRandomNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Number Guessing Game</h1>
      <div className="flex flex-col items-center space-y-4">
        <input
          className="border-2 border-blue-500 outline-none rounded-lg text-black w-60 sm:w-72 p-2"
          type="text"
          value={userGuess}
          placeholder="Guess the Number"
          onChange={handleValue}
          disabled={disbled}
        />
        <button
          onClick={handleSubmit}
          disabled={disbled}
          className="py-2 px-4 bg-blue-500 text-white border-2 border-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Submit
        </button>
        {disbled && (
          <button
            onClick={restartAgain}
            className="py-2 px-4 bg-transparent text-blue-500 border-2 border-blue-500 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Start Again
          </button>
        )}
      </div>
      <div className="mt-8">
        <p className="text-lg font-bold text-green-600">{msg}</p>
        <p className="text-base text-blue-600">{lowOrHigh}</p>
        <p className="text-sm text-gray-600">Total round play by user: {userCount}</p>
        {showRandomNumber && <p className="text-xl text-red-600">Random Number: {randomNumber}</p>}
        <p className="text-sm text-gray-800">
          Your guesses:{" "}
          {userAllGuessesValue?.map((item, i) => (
            <span key={i}>{item}, </span>
          ))}
        </p>
        <button
          onClick={toggleRandomNumber}
          className="py-2 px-4 bg-transparent text-black border-2 border-blue-500 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-4"
        >
          {showRandomNumber ? "Hide Random Number" : "Show Random Number"}
        </button>
      </div>
    </div>
  );
}

export default App;
