import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";
import { useContext } from "react";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
// import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);

const RegisterPage = () => {
  const Login = useContext(AppState);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const Loading = useContext(AppState);

  const Navigate = useNavigate();

  // async () => {
  //   const authRef = doc(collection(db, "Login"));

  //   await setDoc(authRef, {
  //     name: form.name,
  //     email: form.email,
  //     password: email.password,
  //   });
  // };
  const notify = () => toast.success("Login successfully!");
  const error = () => toast.error("Something Wrong");

  const singhupUser = () => {
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(async() => {

        const authRef = doc(collection(db, "Login"));
        await setDoc(authRef, {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        notify()
        Login.setLogin(true);
        Navigate("/");
      })
      .catch(() => error());
    };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex justify-center items-center">
          {/* <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lgm p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"> */}
          <div className="w-1/4">
            <h2 className="text-gray-900 text-4xl font-bold title-font mb-20">
              Sign Up
            </h2>
            <div className="relative mb-4">
              <input
                type="Name"
                id="full-name"
                name="full-name"
                value={form.name}
                placeholder="Enter Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className=" w-full h-12 bg-white rounded-lg border border-violet-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-violet-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                placeholder="Enter Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-12 bg-white rounded-lg border border-violet-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-violet-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <input
                type={"password"}
                id="password"
                name="password"
                value={form.password}
                placeholder="Enter Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full h-12 bg-white rounded-lg border border-violet-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-violet-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              className="w-full text-white bg-violet-600 border-0 py-1.5 focus:outline-non rounded-2xl text-lg"
              onClick={singhupUser}>
              {Loading.loading ? (
                <div>
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
            <ToastContainer/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
