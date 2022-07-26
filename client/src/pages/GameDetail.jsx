import { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const GameDetail = () => {
  const authenticatedUser = useContext(AuthContext);
  const location = useLocation();
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const choices = ["rock", "paper", "scissors"];

  const handleClick = (value) => {
    setUserChoice(value);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  useEffect(() => {
    {
      switch (userChoice + computerChoice) {
        case "scissorspaper":
        case "rockscissors":
        case "paperrock":
          setResult("YOU WIN!");
          break;
        case "paperscissors":
        case "scissorsrock":
        case "rockpaper":
          setResult("YOU LOSE!");
          break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
          setResult("ITS A DRAW!");
          break;
      }
    }
  }, [computerChoice, userChoice]);

  if(!authenticatedUser) {
    return <Navigate to={"/login"} replace state={{ from: location }} />
  } else {
    return (
      <div>
        <NavBar />
        <h1>user choice is: {userChoice}</h1>
        <h1>computer choice is: {computerChoice}</h1>
        {choices.map((choice, index) => (
          <button key={index} onClick={() => handleClick(choice)}>
            {choice}
          </button>
        ))}
        <h1>{result}</h1>
      </div>
    );
  }

  
};

export default GameDetail;
