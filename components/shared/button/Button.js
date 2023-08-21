import React, { useState, useEffect } from "react";
import BtnLoading from "./BtnLoading";

const buttonConfig = {
  //Variants
  primary:
    "btn-primary disabled:bg-gray-300 dark:btn-primary  disabled:border-gray-300 custom-shadow shadow-primary-700/20",
  "primary-outline":
    "bg-transparent text-primary-700 border-2 border-primary-700 hover:ring-4 hover:ring-primary-700/50",
  "primary-clear": "bg-white  dark:bg-zinc-700  text-primary-700",
  red: "bg-red-700 dark:bg-red-800 text-white  hover:ring-4 hover:ring-red-700/50  cursor-pointer",
  orange: "bg-orange-100 dark:bg-red-800 text-white  hover:ring-4 hover:ring-orange-100/50  cursor-pointer ",
  white:
    "bg-white  dark:bg-zinc-700  dark:bg-red-800 text-black  hover:ring-4 hover:ring-white/50 border-2 opacity-40 cursor-pointer",
  // Sizes
  sm: "px-3 py-1.5",
  md: "px-7 py-2.5",
  smx: "h-10 flex items-center justify-center gap-2 w-full",
  lg: "px-10 py-3.5",
  center: "flex  justify-center items-center",
  between: "flex  justify-between items-center",
  green: "btn-primary-green disabled:bg-gray-300 disabled:border-gray-300 custom-shadow shadow-primary-700/20",
  "primary-outline":
    "bg-transparent text-primary-700 border-2 border-primary-700 hover:ring-4 hover:ring-primary-700/50",
  "primary-clear": "bg-white  dark:bg-zinc-700  text-primary-700",
};
const Button = ({
  title,
  icon,
  variant = "primary",
  containerClass,
  size = "md",
  titleClass,
  width = "w-fit",
  justify = "center",
  roundedClass = "rounded-xl",
  disabled,
  loading,
  onClick,
  iconCLass,
}) => {
  const btnTitle = ` ${titleClass || "text-md text-center font-medium"}`;

  return (
    <div className={containerClass}>
      <button
        disabled={disabled || loading}
        type="button"
        className={` relative ${variant !== "green" && "dark:text-black "} truncate font-medium text-sm ${
          buttonConfig[variant]
        } ${buttonConfig[size]} ${buttonConfig[justify]}  ${btnTitle}  ${roundedClass} ${width} ${
          disabled && "bg-neutral-200 border-gray-400 hover:ring-0"
        }`}
        onClick={typeof onClick == "function" ? onClick : void null}
      >
        {!!icon && <span className={`ml-1 ${iconCLass}`}>{icon}</span>}

        {loading ? (
          <div className=" ">
            <BtnLoading />
          </div>
        ) : (
          title
        )}
      </button>
    </div>
  );
};

export default Button;

/* 
 title,
  icon,
  background = 'bg-primary-800',
  containerClass,
  size = "md",
  hasFocus = true,
  titleClass,
  roundedClass,
  disabled,
  loading,
  onClick,
}) => {
  let btnlass = "relative inline-flex items-center ";
  let btnBg = `${background} ${hasFocus && `focus:ring-4 focus:ring-${background}/50`}`;
*/
