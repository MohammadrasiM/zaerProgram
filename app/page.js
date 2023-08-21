"use client";

import moment from "moment-jalaali";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/shared/button/Button";

import { ApiCall } from "../helpers/ApiCall";
import { p2e } from "../helpers/NumberConverter";

import { apiRoutes } from "../utils/urls";
import FormInputs from "@/components/shared/form/FormInputs";
import Notify from "@/components/shared/Toast";

const Login = ({ searchParams }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const redirect_url = searchParams?.redirect_url ?? null;

  const [mobile, setMobile] = useState("");
  const [disable, setDisable] = useState(false);
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setnumberTwo] = useState(0);
  const [again, setAgain] = useState(false);
  const [sum, setSum] = useState();

  useEffect(() => {
    setNumberOne(Math.floor(Math.random() * (59 - 1 + 1)) + 1);
    setnumberTwo(Math.floor(Math.random() * (59 - 1 + 1)) + 1);
  }, [again]);
  useEffect(() => {
    document.addEventListener("keydown", _onKeyDown);
    return () => {
      document.removeEventListener("keydown", _onKeyDown);
    };
  }, [onSubmit]);

  function _onKeyDown(e) {
    if (e.code == "Enter") validateMobileNumber();
  }

  /* ------------------------- VALIDATE MOBILE NUMBER ------------------------- */
  const validateMobileNumber = () => {
    if (!mobile) {
      return false;
    }
    const numericMobile = p2e(mobile);
    if (numericMobile[0] != 11 && isNaN(numericMobile)) {
      return false;
    }
    onSubmit();
  };

  /* ------------------------------- SUBMIT FORM ------------------------------ */
  function onSubmit() {
    if (Number(sum) != numberTwo + numberOne) {
      console.log("setAgainsetAgainsetAgain");
      Notify({ body: "جمع اعداد درست نمیباشد" });
      setAgain(!again);
    } else {
      dispatch({
        type: "AUTH_CODE_EXPIRE",
        payload: moment().add(6, "minute"),
      });
      //TODO: REMOVE IT IN FINAL RELEASE

      router.push(`/otp?mobile_number=${mobile}`);
      ////////////////////
      const numericMobile = p2e(mobile);
      dispatch({
        type: "AUTH_CODE_EXPIRE",
        payload: moment().add(3, "minute"),
      });

      setDisable(true);
      const body = {
        mobile_number: mobile,
      };
      // ApiCall(
      //   "POST",
      //   apiRoutes.AU1,
      //   body,
      //   "SEND VERIFY CODE",
      //   (res) => {
      //     dispatch({
      //       type: "IS_REGISTERED",
      //       payload: res.data.is_register,
      //     });
      //     //TODO: REMOVE IT IN FINAL RELEASE

      //     router.push(`/otp?mobile_number=${mobile}`);
      //     setDisable(false);
      //   },
      //   (err) => setDisable(false)
      // );
    }
  }

  return (
    <div className={`flex flex-col h-screen justify-start  md:!p-2 md:justify-center `}>
      <div className="auth-container h-full md:h-fit relative flex flex-col px-4 md:px-9">
        <img src="/assets/images/zerlogo.jpg" className="w-[46%] aspect-auto mx-auto object-cover max-w-[220px]" />
        <div className="w-full mx-auto text-center flex items-center justify-center ">
          <h2 className="font-medium mt-2 mb-4 text-lg ">{"ثبت نام و یا ورود کاربر"}</h2>
        </div>

        <div className="bg-purple-1000 w-48  mb-4 self-center h-1 rounded-full"></div>
        <div className="my-1">
          <p className=" font-medium  text-sm mt-2 self-center text-center mb-4">
            {"برای ورود شماره تلفن همراه خود را وارد نمایید."}
          </p>
          <div className={`mb-4 w-full mx-auto flex flex-col flex-1 px-4`}>
            <div className=" gap-2">
              {/* <label className={`block mb-2 text-xs pr-1 font-medium text-gray-800 dark:text-gray-300`}>
                شماره تلفن همراه
              </label> */}
              <input
                type="tel"
                pattern="[0-9]*"
                className="w-full md:w-full rounded-xl border dark:border-zinc-600 dark:bg-zinc-700 py-3.5 px-2  text-center  font-bold"
                style={{ letterSpacing: 3, fontSize: 16, direction: "ltr" }}
                id="mobile"
                maxLength={11}
                placeholder="- - - - - - - - - - -"
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                onFocus={(event) => {
                  event.target.setAttribute("autocomplete", "off");
                }}
                value={mobile}
              />
              <div className="flex mt-4  items-center justify-center py-4 gap-6  flex-row">
                <p className="text-sm"> جمع مقادیر روبرو :</p>{" "}
                <FormInputs
                  item={{
                    keyboard: "number",
                    isMandatory: true,

                    placeholder: "جمع مقادیر روبرو",
                    containerClass: "!mb-0",
                    inputClass: "placeholder:text-start",
                    autoFocus: false,
                    maxLength: 12,
                  }}
                  onChangeText={(e) => {
                    setSum(e);
                  }}
                  value={sum}
                />
                <div className=" flex items-center text-xl font-semibold text-green-600  opacity-75 gap-2">
                  <p key={"numberOne"}>{numberOne}</p>
                  <p>+</p>
                  <p key={"numberTwo"}>{numberTwo}</p>
                </div>
              </div>
              {/* COUNTRY SELECTOR */}
              {/* <div className="w-3/12 md:w-2/12 cursor-pointer rounded-xl flex justify-center items-center bg-neutral-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 py-3   text-center  font-bold">
                {isLoading ? (
                  <SmallLoading />
                ) : (
                  <div className="flex justify-end items-center w-full relative" onClick={() => setvisibleCountryModal(true)}>
                    <img src="/assets/icons/form/chevron-down.svg" className="absolute right-2 dark:invert" />
                    <div className="ml-1.5 text-en" style={{ direction: "ltr" }}>
                      {selectedCountry?.calling_code}
                    </div>
                    <div className="pt-1 ml-2">{selectedCountry?.flag_emoji}</div>
                  </div>
                )}
              </div> */}
            </div>
            <Button
              disabled={disable || mobile?.length != 11}
              loading={disable}
              title={"ثبت نام / ورود"}
              onClick={() => {
                onSubmit();
              }}
              width="w-full"
              containerClass="mt-4 mb-4 self-center w-full"
            />
          </div>
        </div>
        {/* <Divider /> */}
      </div>

      {/* COUNTRIES MODAL */}
      {/* <Modal show={visibleCountryModal} onHide={() => setvisibleCountryModal(false)}>
        <div className="py-4 px-4 app-text">
     
          <div className="app-text flex justify-between items-center py-4 px-2 sticky top-0  z-10">
            <h3 className="mr-2 font-medium">{"انتخاب کشور"}</h3>
            <img
              src="/assets/icons/lawyer/close.svg"
              className="w-6 h-6 dark:invert"
              alt=""
              onClick={() => setvisibleCountryModal(false)}
            />
          </div>
          <Divider moreClass="border-dashed my-3" />
          <div className="divide-y divide-gray-300 dark:divide-zinc-600">
            {countries?.map((e) => (
              <div key={e.id} onClick={() => setselectedCountry(e)}>
                <div className="flex  justify-end items-center text-en py-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-zinc-600">
                  <div className="ml-4 font-bold">{e?.name}</div>
                  <div>{e?.flag_emoji + "  " + e?.calling_code}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal> */}

      {/* TERMS MODAL */}
    </div>
  );
};

export default Login;

// import React, { useEffect, useMemo, useState } from "react";

// import FixedButton from "../components/shared/button/FixedButton";

// import { useRouter } from "next/navigation";
// import FormInput from "../components/shared/form/FormInputs";
// import { useDispatch } from "react-redux";
// import moment from "moment-jalaali";

// const Login = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [numberOne, setNumberOne] = useState(0);
//   const [numberTwo, setnumberTwo] = useState(0);
//   const [mobile, setmobile] = useState();
//   const [sum, setSum] = useState();
//   const [disable, setDisable] = useState(false);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     setNumberOne(Math.floor(Math.random() * (9 - 1 + 1)) + 1);
//     setnumberTwo(Math.floor(Math.random() * (9 - 1 + 1)) + 1);
//   }, []);

//   return (
//     <div className="auth-container min-h-screen h-fit  relative">
//       <img
//         src="/assets/images/zerlogo.jpg"
//         className="w-[46%] aspect-auto mx-auto object-cover max-w-[220px] mb-8 mt-12"
//       />

//       <div className="my-1 px-4 mt-20 ">
//         <p className="text-center font-medium  text-sm mt-2 mb-4">{"شماره موبایل خود را وارد کنید"}</p>

//         <div className={`mb-4 w-full mx-auto flex flex-col  `}>
//           <div className="flex  gap-2 flex-col">
//             <FormInput
//               item={{
//                 title: "موبایل",
//                 keyboard: "number",
//                 // isMandatory: true,

//                 placeholder: "موبایل",
//                 containerClass: "w-full",
//                 inputClass: "placeholder:text-start",
//                 autoFocus: true,
//                 maxLength: 12,
//               }}
//               onChangeText={(e) => {
//                 setmobile(e);
//               }}
//               value={mobile}
//             />
//           </div>
//           <div className="flex  items-center justify-start gap-12 flex-row">
//             <FormInput
//               item={{
//                 title: "جمع مقادیر روبرو",
//                 keyboard: "number",
//                 // isMandatory: true,

//                 placeholder: "جمع مقادیر روبرو",
//                 containerClass: "",
//                 inputClass: "placeholder:text-start",
//                 autoFocus: false,
//                 maxLength: 12,
//               }}
//               onChangeText={(e) => {
//                 setSum(e);
//               }}
//               value={sum}
//             />
//             <div className=" flex items-center mt-4 opacity-75 gap-4">
//               <p key={"numberOne"}>{numberOne}</p>
//               <p>+</p>
//               <p key={"numberTwo"}>{numberTwo}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <FixedButton
//         title={"ورود"}
//         disable={Number(sum) != numberTwo + numberOne ? true : false}
//         loading={loading || disable}
//         onClick={() => {
//           dispatch({
//             type: "AUTH_CODE_EXPIRE",
//             payload: moment().add(6, "minute"),
//           });
//           router.push(`/otp?mobile_number=${mobile}`);
//         }}
//       />
//     </div>
//   );
// };

// export default Login;
