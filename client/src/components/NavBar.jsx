import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export default function NavBar() {
  const authenticatedUser = useContext(AuthContext);
  console.log(authenticatedUser);
  const onLogoutClick = async () => {
    await signOut(auth);
  };
  return (
    <>
      <div className="bg-[#161616] flex w-full px-28 py-6 justify-between">
        <div className="">
          <Link to={"/"}>
            <img src="logo.svg" alt="logo" height={32} width={150} />
          </Link>
        </div>
        <div>
          <ul className="flex font-medium text-white text-[1.3rem]">
            <li className="mr-[3.125rem] hover:text-sky-600 transition-colors">
              <Link to={"/games"}>Games</Link>
            </li>
            <li className="mr-[3.125rem] hover:text-sky-600 transition-colors"><Link to={"/leaderboard"}>LeaderBoard</Link></li>
            <li className="mr-[3.125rem] hover:text-sky-600 transition-colors cursor-pointer">Support</li>
          </ul>
        </div>
        {authenticatedUser ? (
          <div className="flex font-medium text-white text-[1.3rem] items-center">
            <h4 className="mr-4">Howdy, <Link className="hover:text-sky-600 transition-colors" to={'/profile'}>{authenticatedUser.email.split('@')[0]}</Link></h4>
            <button onClick={onLogoutClick} className="bg-[#F1B03D] text-[#161616] font-medium text-xl rounded-[18px] px-[25px] py-[5px]">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex font-medium text-white text-[1.3rem]">
            <h4 className="mr-3">
              <Link to={"/login"}>Login</Link>
            </h4>
            <h4 className="mr-3"> | </h4>
            <h4>
              <Link to={"/register"}>Register</Link>
            </h4>
          </div>
        )}
      </div>
    </>
  );
}
