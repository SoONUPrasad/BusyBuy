import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { AppState } from "../App";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth();
const LoginPage = () => {
  const Navigate = useNavigate();
  const Login = useContext(AppState);
  const Loader = useContext(AppState);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const notify = () => toast.success("Login successfully!");
  const error = () => toast.error("Login failed!");

  const user = auth.currentUser;

  const sighIn = () => {
    Loader.handlLoader();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(async() => {
        if (user) {
          Navigate('/')
          Login.setLogin(true);
        } else {
          alert("User Not Found");
        }
        notify()
      }).then(Navigate('/'))
      .catch(() => error())
      // Loader.setLoader(false);
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex justify-center items-center">
          {/* <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lgm p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"> */}
          <div className="w-1/4">
            <h2 className="text-gray-900 text-4xl font-bold title-font mb-20">
              Sign In
            </h2>
            <div className="relative mb-4">
              <input
                type="email"
                id="full-name"
                name="full-name"
                value={form.email}
                placeholder="Enter Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className=" w-full h-12 bg-white rounded-lg border border-violet-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-violet-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                placeholder="Enter Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full h-12 bg-white rounded-lg border border-violet-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-violet-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <>
              <button
                className="w-full text-white bg-violet-600 border-0 py-1.5 focus:outline-non rounded-2xl text-lg"
                onClick={sighIn}>
                {Loader.loader ? (
                  <div>
                    <BeatLoader color="white" size={10}/>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
              <ToastContainer />
            </>
            <Link to={"/signUp"}>
              <p className="text-md text-gray-900 font-serif mt-3">
                or SignUp instead
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
