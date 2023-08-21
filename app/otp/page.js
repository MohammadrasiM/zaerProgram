"use client";

import React, { useEffect, useState } from "react";

// import { ApiCall } from "../../helpers/ApiCall";
// import { apiRoutes } from "../../utils/urls";
import moment from "moment-jalaali";
import FixedButton from "../../components/shared/button/FixedButton";
import { calculateTimeLeft } from "../../helpers/calculateTimeLeft";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { p2e } from "../../helpers/NumberConverter";
import OtpInput from "../../components/shared/form/OtpInput";
import Button from "@/components/shared/button/Button";

function Otp({ searchParams }) {
  const dispatch = useDispatch();
  const { authCodeExpire, isRegistered } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const [resent, setResent] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const [reset, setReset] = useState(false);
  const { mobile_number, redirect_url } = searchParams;
  useEffect(() => {
    document.addEventListener("keydown", _onKeyDown);
    return () => {
      document.removeEventListener("keydown", _onKeyDown);
    };
  }, [onSubmit]);

  function _onKeyDown(e) {
    if (e.code == "Enter") validOtp();
  }

  useEffect(() => {
    if (calculateTimeLeft) {
      const interval = setInterval(() => {
        const time = calculateTimeLeft(authCodeExpire);
        setCountdown(time);
        if (time?.minutes == "00" && time.seconds == "00") clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [authCodeExpire]);

  function _render() {
    if (!!countdown) {
      if (countdown.seconds == "00" && countdown.minutes == "00") {
        return (
          <div
            className="text-primary-blue font-medium flex  cursor-pointer w-full justify-end mb-4  gap-3"
            onClick={() => onResend()}
          >
            <img src="/assets/icons/auth/refresher.svg" />
            {"ارسال مجدد کد"}
          </div>
        );
      } else
        return (
          <div className="text-dark-200 dark:text-gray-300 font-normal text-xsm flex  w-full justify-end mb-4  gap-3">
            <img src="/assets/icons/auth/clock.svg" />
            {`${countdown?.minutes}:${countdown?.seconds}`}{" "}
          </div>
        );
    }
  }
  useEffect(() => {
    if (otp?.length == 5) {
      validOtp();
    }
  }, [otp]);

  function validOtp() {
    if (!otp || otp.length <= 4) {
    } else {
      onSubmit();
    }
  }
  function onResend() {
    setReset(!reset);
    const numericMobile = p2e(mobile_number);
    dispatch({
      type: "AUTH_CODE_EXPIRE",
      payload: moment().add(2, "minute"),
    });

    setDisable(true);
    const body = {
      mobile_number: numericMobile,
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

    //     setOtp("");
    //     setDisable(false);
    //     setResent(true);
    //   },
    //   (err) => setDisable(false)
    // );
  }
  function onSubmit() {
    const numericCode = p2e(otp);
    if (!numericCode || isNaN(numericCode) || numericCode?.length < 5) {
    }
    router.push("/register");
    setDisable(true);
    const body = {
      mobile_number: mobile_number,
      code: numericCode,
      // full_name: fullname,
    };
    // ApiCall(
    //   "post",
    //   apiRoutes.AU2,
    //   body,
    //   "verify",
    //   ({ data }) => {

    //   },
    //   (err) => setDisable(false)
    // );
  }
  return (
    <div className={`flex flex-col h-screen justify-start  md:!p-2 md:justify-center `}>
      <div className="auth-container h-full md:h-fit relative flex flex-row ">
        <div className="flex flex-col px-4 md:px-9  gap-8">
          <img
            src="/assets/images/ziarat.png"
            className="w-[35%]  mt-8 aspect-auto mx-auto object-cover max-w-[220px]"
          />

          <div className="my-1 px-4  flex flex-col   flex-wrap ">
            <div className="text-center font-base flex-wrap  text-dark-200 dark:text-gray-300  mt-2 mb-4 flex text-xs gap-1 items-center justify-center">
              {" رمز یکبار مصرف به شماره همراه "}
              <p className="text-primary-800">{mobile_number}</p> {"ارسال شد"}
            </div>
            <div
              onClick={() => router.replace("/")}
              className="flex w-full cursor-pointer flex-wrap text-orange-100  items-center gap-1.5 pl-6 justify-end"
            >
              {/* <img src="/assets/icons/edit-icon.svg" className="w-4 aspect-square" />{" "} */}
              <p className="text-xs font-light text-green-500"> {"ویرایش شماره همراه "}</p>
            </div>

            <div className="mt-2 mb-6 ">
              <p className="text-xs font-light  text-dark-200 dark:text-gray-300  ">
                {"رمز یکبار مصرف ارسالی را وارد نمایید "}
              </p>
            </div>
            <div className={`mb-4 w-full mx-auto flex flex-col gap-16`}>
              <div className="flex  gap-2 flex-col">
                <OtpInput setValue={setOtp} value={otp} refresh={reset} />
              </div>
            </div>
          </div>
          {/* <FixedButton
        disable={disable}
        rules={false}
        loading={disable}
        timer={_render}
        onClick={() => {
          validOtp();
        }}
        title={"ورود"}
      /> */}
          <div className=" ">{_render()}</div>
          <Button
            containerClass={"w-full mt-4"}
            width="w-full"
            disable={disable}
            loading={disable}
            title={"ثبت نام / ورود"}
            onClick={() => {
              validOtp();
            }}
          />
        </div>
        <div className="relative hidden md:block rounded-l-20 overflow-hidden">
          <img className="w-full rounded-l-20 object-fill" src="/assets/images/arbaein.jpeg" />
        </div>{" "}
      </div>
    </div>
  );
}

export default Otp;
