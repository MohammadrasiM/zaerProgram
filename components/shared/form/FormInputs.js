import React, { useRef, memo } from "react";
import Num2persian from "../../../helpers/Num2Persian";

import { OnlyNum } from "../../../helpers/OnlyNumbers";
const FormInput = ({ item, value, onChangeText, errors, errorKey, errorKey2 }) => {
  const inputRef = useRef();

  return (
    <div className={item?.containerClass + " mb-4 relative"}>
      {item.title ? (
        <label
          htmlFor={`input-${item.id}`}
          className={`select-none block mb-3 mr-2 text-sm   pr-1 font-normal text-dark-100 dark:text-gray-300 ${
            item.isMandatory && "after:content-['*'] after:mr-1 after:text-red-500"
          } ${item.titleClass || ""}`}
        >
          {item.title}
          <span className="fs-8 text-danger">{item.titleHint}</span>
        </label>
      ) : (
        <></>
      )}
      <div className="relative">
        {" "}
        <input
          type={item.keyboard == "password" ? "password" : item.keyboard == "number" ? "number" : "text"}
          onBlur={item?.onBlur}
          ref={item?.ref ? item?.ref : inputRef}
          inputMode={item.keyboard == "number" ? "numeric" : "text"}
          pattern={item.keyboard == "number" ? "[0-9]*" : ""}
          // onScroll={(e) => {
          //   e.preventDefault();
          // }}
          // onKeyDown={(e) => {

          // }}
          className={` ${item?.inputClass}  noscroll form-control  text-[0.9375rem] font-normal  bg-white  ${
            item?.direction ? item?.direction : ""
          }  dark:bg-zinc-800   border  border-gray-300 focus:border-green-600 py-3 px-4 w-full rounded-xl placeholder:text-gray-400  placeholder:text-xs dark:placeholder:text-zinc-300 ${
            item?.disableHover
              ? ""
              : item.error || (!!errors && !!errors[errorKey])
              ? "!border-red-100"
              : " hover:border-primary-blue focus:border-primary-blue"
          } `}
          id={`input-${item.id}`}
          placeholder={item.placeholder || item.title}
          onChange={(v) => {
            if (item?.maxLength && item?.maxLength !== null && v?.target?.value.length >= item?.maxLength)
              item?.ref ? "" : inputRef.current.blur();
            else if (item.keyboard != "number") onChangeText(v?.target?.value);
            else if (!isNaN(v?.target?.value)) {
              onChangeText(OnlyNum(v?.target?.value));
            }
          }}
          // onKeyDown={(evt) => {
          //   if (item.keyboard == "number" && evt.key !== "Backspace") {
          //     // console.log(OnlyNum(evt.key), "OnlyNumOnlyNum", typeof OnlyNum(evt.key));
          //     // OnlyNum(evt.key) == "-1" && evt.preventDefault();
          //   }

          //   if (evt.key == "Enter" && item?.onEnter) {
          //     item?.onEnter();
          //   }
          // }}
          maxLength={item?.maxLength || 256}
          disabled={item?.disabled}
          value={value}
          autoFocus={item?.autoFocus}
          onFocus={(event) => {
            event.target.setAttribute("autocomplete", "off");
          }}
        />
        {/* {item.extraButton == "close" ? (
          <img
            src="/assets/icons/register/cancle-circle.svg"
            className={`w-6 absolute left-4 top-[25%] cursor-pointer dark:invert  ${item?.extraButtonClass}`}
            onClick={item?.extraButtonFunction}
          />
        ) : (
          <></>
        )} */}
      </div>
      {!!item.hint && (
        <div
          id={`${item.id}`}
          className={`text-xs absolute font-light text-gray-400 mt-1 mr-5  ${item?.error && "!text-red-100"}`}
        >
          {item.hint}
        </div>
      )}{" "}
      {!!errors && (!!errors[errorKey] || !!errors[errorKey2]) && (
        <div
          id={`${item.id}`}
          className={`text-xs !absolute text-red-100 duration-300 transition-all ease-in-out  mt-2 mr-5  truncate`}
        >
          {errors[errorKey]?.map((e, i) => e)}
        </div>
      )}
      {!!item.convertToText && !!value && (
        <div id={`${item.id}`} className="!text-xxs text-primary mt-1">
          {Num2persian(value)}
        </div>
      )}
    </div>
  );
};

function isEqualProps(prevProps, nextProps) {
  return (
    prevProps.value == nextProps.value &&
    prevProps.item?.disabled == nextProps.item?.disabled &&
    prevProps.errors == nextProps.errors &&
    prevProps?.item?.error == nextProps?.item?.error &&
    prevProps?.item?.hint == nextProps?.item?.hint
  );
}
export default memo(FormInput, isEqualProps);
// export default FormInput;
