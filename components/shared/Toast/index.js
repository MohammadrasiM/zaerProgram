import React from "react";
import toast from "react-hot-toast";
import { errorIcon, successIcon, warningIcon, closeIcon, infoIcon } from "./icons";

const Notify = (props) => {
  const { type = "info", title, body, cb, children } = props || {};

  const _findTypeData = () => {
    switch (type) {
      case "success":
        return { icon: successIcon, border: "border-r-green-500" };
      case "error":
        return { icon: errorIcon, border: "border-r-rose-500" };
      case "warn":
        return { icon: warningIcon, border: "border-r-yellow-400" };
      case "info":
        return { icon: infoIcon, border: "border-r-sky-400" };

      default:
        return { icon: infoIcon, border: "border-r-sky-400" };
    }
  };

  toast.custom(
    (t) => (
      <div
        className={`flex justify-start items-center bg-white  dark:bg-zinc-700  dark:bg-zinc-700   w-full md:w-1/2 rounded-lg px-3 py-3 text-black mx-auto  border border-gray-100 dark:border-0 
        border-r-8 dark:border-r-8 ${_findTypeData().border} 
        transform-gpu translate-y-0 hover:translate-y-1  relative transition-all duration-500 ease-in-out 
        ${t.visible ? "top-0" : "-top-96"}`}
        onClick={() => {
          toast.dismiss(t.id);
          typeof cb == "function" && cb();
        }}
      >
        {_findTypeData().icon}
        <div className="mr-3 app-text">
          <h1 className="font-bold text-sm">{title}</h1>
          <p className="font-light w-full text-[13px]">{body}</p>
          {children}
        </div>
        <div className="absolute left-3 ">{closeIcon}</div>
      </div>
    ),
    { id: `${Math.random() * 10}`, position: "top-center", duration: 3000 }
  );
};

export default Notify;
