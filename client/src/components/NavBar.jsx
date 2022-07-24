import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
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
            <li className="mr-[3.125rem] text-[#F1B03D]">
              <Link to={"/games"}>Games</Link>
            </li>
            <li className="mr-[3.125rem]">Pembayaran</li>
            <li className="mr-[3.125rem]">Support</li>
          </ul>
        </div>
        <div className="flex font-medium text-white text-[1.3rem]">
          <h4 className="mr-3">
            <Link to={"/login"}>Login</Link>
          </h4>
          <h4 className="mr-3"> | </h4>
          <h4>
            <Link to={"/register"}>Register</Link>
          </h4>
        </div>
      </div>
    </>
  );
}
