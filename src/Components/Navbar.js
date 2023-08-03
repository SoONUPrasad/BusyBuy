import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppState } from "../App";

const Navbar = () => {
  const Login = useContext(AppState);
  const handlLoader = useContext(AppState);
  return (
    <div>
      <div className="flex justify-between shadow-md shadow-slate-200 h-20 py-2">
        <Link to={"/"}>
          <h1 className=" cursor-pointer text-xl py-4 ml-24 text-violet-700" onClick={handlLoader.handlLoader}>
            Busy Buy
          </h1>
        </Link>
        <nav>
          <ul className="flex gap-14 mr-24 text-xl text-violet-700 cursor-pointer py-3">
            <Link to={"/"}>
              <li className="flex gap-1">
                <img
                  className=" h-10"
                  src={require("../Images/download.png")}
                  alt=""
                />
                <span className=" py-2 font-semibold text-lg hover:text-black">
                  Home
                </span>
              </li>
            </Link>
            {Login.login ? (
              <>
                <Link to={"/order"}>
                  <li className="flex gap-1">
                    <img
                      className=" h-10"
                      src={require("../Images/download (1).png")}
                      alt=""
                    />
                    <span className="pt-2 font-semibold text-lg hover:text-black">
                      MyOrder
                    </span>
                  </li>
                </Link>
                <Link to={"/cart"}>
                  <li className="flex gap-1">
                    <img
                      className=" h-10"
                      src={require("../Images/download (2).png")}
                      alt=""
                    />
                    <span className="pt-2 font-semibold text-lg hover:text-black">
                      Card
                    </span>
                  </li>
                </Link>
                <Link to={"/signIn"}>
                  <li className="flex gap-1">
                    <img
                      className=" h-10"
                      src={require("../Images/download (3).png")}
                      alt=""
                    />
                    <span
                      className="pt-2 font-semibold text-lg hover:text-black"
                      onClick={() => Login.setLogin(false)}
                    >
                      LogOut
                    </span>
                  </li>
                </Link>
              </>
            ) : (
              <Link to={"/signIn"}>
                <li className="flex gap-1">
                  <img
                    className=" h-10"
                    src={require("../Images/download (4).png")}
                    alt=""
                  />
                  <span className="pt-2 font-semibold text-lg hover:text-black">
                    SighIn
                  </span>
                </li>
              </Link>
            )}
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
