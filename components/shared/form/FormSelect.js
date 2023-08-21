// import { Transition } from "@headlessui/react";

import { Fragment, useEffect, useRef, useState } from "react";

const FormSelect = ({
  item,
  list,
  value,
  property = "title",
  dropdownIcon,
  isSearchable,
  onSelect,
  title,
  titleClass,
  parentClass,
  innerContainer,
  inputClass,
  errors,
  errorKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(null);
  const [options, setOptions] = useState(list);
  const selectorRef = useRef();

  useEffect(() => {
    setOptions(list);
  }, [list]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        //Close if clicked on outside of element
        setIsOpen(false);
        query && setQuery(null);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onSearch();
  }, [query]);

  const onSearch = () => {
    if (list && list?.length == 0) return;

    if (!query) setOptions(list);
    else {
      const res = list.filter((e) =>
        `${e[property]}`.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
      );
      setOptions(res);
    }
  };

  return (
    <div className={parentClass} ref={selectorRef}>
      <div as="div" className="relative inline-block w-full">
        <div>
          {title ? (
            <div className={` text-sm mb-3 font-normal text-dark-100 dark:text-gray-300   ${titleClass}`}>{title}</div>
          ) : (
            <></>
          )}
          <div
            className={`${innerContainer} ${
              item?.disableHover ? "" : "hover:border-primary-blue focus:border-primary-blue "
            } form-control border border-gray-300  hover:border-green-600 focus:border-green-600 rounded-xl py-2 px-2 justify-between items-center w-full ${
              item?.disabled ? "opacity-30 !bg-[#E5E5E5]" : ""
            }`}
            onClick={() => {
              item?.disabled ? console.log("disabled") : setIsOpen((e) => !e);
            }}
          >
            {isSearchable ? (
              <input
                disabled={item?.disabled}
                placeholder={item?.placeholder ? item?.placeholder : title}
                onChange={(e) => setQuery(e.target.value)}
                value={
                  typeof query == "string"
                    ? query
                    : options.find((_) => _.id == value)
                    ? options.find((_) => _.id == value)[property]
                    : ""
                }
                className={`bg-white   target:bg-white dark:bg-zinc-800 w-5/6 ${
                  item?.disabled ? "opacity-30 !bg-[#E5E5E5]" : ""
                } `}
              />
            ) : (
              <div className={`${value ? "opacity-100" : "opacity-70"} w-5/6 ${value && inputClass}`}>
                {options.find((_) => _.id == value)
                  ? options.find((_) => _.id == value)[property]
                  : item?.placeholder
                  ? item?.placeholder
                  : title}
              </div>
            )}
            <img
              src={dropdownIcon || "/assets/icons/form/chevron-down.svg"}
              className="h-2 w-2 dark:invert"
              aria-hidden="true"
            />
          </div>
          <div
            show={!!errors && !!errors[errorKey]}
            enter="transition-all ease-in-out duration-300"
            enterFrom="transform opacity-0 scale-0 h-0"
            enterTo="transform opacity-100 h-full scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {" "}
            {!!errors && !!errors[errorKey] && (
              <div
                id={`${item.id}`}
                className={`text-xs text-red-100 duration-300 transition-all ease-in-out  mt-2 mr-5  `}
              >
                {errors[errorKey]?.map((e, i) => e)}
              </div>
            )}
          </div>
        </div>
        <div
          hidden={!isOpen}
          show={isOpen}
          as={Fragment}
          // className="z-20"
          enter="transition !rounded-xl ease-out duration-100 z-20"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100 !rounded-xl z-20"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className=" !rounded-xl"
        >
          <div className="absolute !z-20 !rounded-xl right-0 mt-2 w-full origin-top-center  rounded-4 bg-white  dark:bg-zinc-700  dark:bg-zinc-700 custom-shadow ring-1 ring-black ring-opacity-5 focus:outline-none max-h-64 overflow-scroll">
            <div className="py-1 divide-y divide-gray-250 dark:divide-gray-500">
              {options && options?.length == 0 && <p className="opacity-60 text-xs text-center pt-3">موردی یافت نشد</p>}
              {options?.map((e, i) => {
                const isSelected = e.id == value?.id;
                return (
                  <div key={i}>
                    <button
                      className={`${
                        isSelected
                          ? "bg-primary-700 bg-opacity-10 dark:bg-opacity-30"
                          : "text-gray-700 dark:text-gray-300 hover:bg-primary-700 dark:hover:bg-zinc-600 hover:text-green-500"
                      }  flex w-full items-center  px-2 py-3 ${item?.optionClass || "text"}`}
                      onClick={(v) => {
                        onSelect(e);
                        setIsOpen(false);
                        setQuery(null);
                      }}
                    >
                      <CheckIcon isSelected={isSelected} />
                      <div className="text-right">{e[property]}</div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = ({ isSelected }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${isSelected ? "opacity-100" : "opacity-0"} h-4 w-4 ml-1 stroke-green-700`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
};
export default FormSelect;
