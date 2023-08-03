import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Card from "./Components/Card";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import Orders from "./Components/Orders";
import { createContext } from "react";

const AppState = createContext();

const App = () => {
  const [login, setLogin] = useState(false);
  const [loader, setLoader] = useState(false);

const handlLoader = () => {
 
    setLoader(true);
    setTimeout(() => setLoader(false), 2000);
}

  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/Cart", element: <Card /> },
        { path: "/signIn", element: <LoginPage /> },
        { path: "/signUp", element: <RegisterPage /> },
        { path: "/order", element: <Orders /> },
      ],
    },
  ]);

  return (
    <>
      <AppState.Provider value={{ login, setLogin, loader, setLoader, handlLoader }}>
        <RouterProvider router={routers} />
      </AppState.Provider>
    </>
  );
};

export default App;
export { AppState };
