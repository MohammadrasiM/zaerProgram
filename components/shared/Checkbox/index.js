import React from "react";

const Checkbox = ({ title, isChecked, onSelect, options }) => {
  return (
    <div className={"my-2.5"}>
      <div className={` flex flex-row  rounded-lg items-center cursor-pointer  `} onClick={onSelect}>
        <div className={`${"w-4 h-4 rounded-sm border border-gray-300 p-0.5"}  ${isChecked ? "bg-green-500" : ""}`}>
          {isChecked && (
            <div className={`w-full h-full bg-primary-700   flex items-center justify-center `}>
              <img src="/assets/icons/auth/tick.svg" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
