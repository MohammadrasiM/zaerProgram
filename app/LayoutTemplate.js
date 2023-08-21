"use client";
import { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
// import { store } from "../redux/reducers/index";
// import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  // useEffect(() => {
  //   __findInitialDarkMode__();
  // }, []);
  // const __findInitialDarkMode__ = () => {
  //   const x = localStorage.getItem("theme-mode");
  //   let mode = "dark";
  //   if (x) mode = x;

  //   const colorTheme = mode;
  //   const root = window.document.documentElement;
  //   root.classList.remove(colorTheme);
  //   root.classList.add(mode);
  //   localStorage.setItem("theme-mode", mode);
  // };

  // useEffect(() => {
  //   const root = window.document.documentElement;
  //   root.classList.remove("light");
  //   root.classList.add("dark");
  //   localStorage.setItem("theme-mode", "dark");
  //   document.documentElement.setAttribute("data-theme", "dark");
  // }, []);
  return (
    // <Provider store={store}>
    <div className="app-background app-text transition-opacity">
      <div className="fixed top-0 bg-[#f3f5f8]  left-0 w-full h-full bg-cover  blur-md scale-110 "></div>
      <div className="app-size " style={{ minHeight: "100vh" }}>
        <div className="w-full  mx-auto h-full ">
          {" "}
          <div className={`flex flex-col min-h-screen    justify-start md:justify-center `}>{children}</div>
        </div>
        {/* <Toaster /> */}
      </div>
      <Toaster />
    </div>
    // </Provider>
  );
};
export default Layout;
