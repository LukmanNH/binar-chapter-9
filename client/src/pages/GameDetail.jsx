import { useEffect, useState, useContext } from "react";
import NavBar from "../components/NavBar";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary";
import {
  child,
  ref,
  set,
  push,
  update,
  getDatabase,
  get,
} from "firebase/database";
import { auth, db } from "../services/firebase";

const GameDetail = () => {
  const authenticatedUser = useContext(AuthContext);
  const location = useLocation();
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [postData, setPostData] = useState({});
  const [score, setScore] = useState(0);
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
          setScore(score + 1);
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

  const submitScore = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${authenticatedUser.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPostData({
            email: snapshot.val().email,
            name: snapshot.val().name,
            phone: snapshot.val().phone,
            point: score,
          });
          update(ref(db, `users/${authenticatedUser.uid}`), {
            point: postData.point
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!authenticatedUser) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  } else {
    return (
      <div>
        <NavBar />
        <div className="text-center">
          <h1>user choice is: {userChoice}</h1>

          {choices.map((choice, index) => (
            <button
              className="bg-amber-600 text-white px-8 py-2 mr-4 rounded-lg"
              key={index}
              onClick={() => handleClick(choice)}
            >
              {choice}
            </button>
          ))}
          <h1>computer choice is: {computerChoice}</h1>
          <h1>{result}</h1>
          <h1>Score: {score}</h1>
          <button
            onClick={submitScore}
            className="mt-12 bg-[#F1B03D] text-[#161616] font-medium text-lg rounded-[18px] px-[30px] py-[10px]"
          >
            Submit Score
          </button>
        </div>
      </div>
    );
  }
};

export default GameDetail;
