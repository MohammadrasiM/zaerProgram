import React, { useMemo, useState } from "react";

function OtpInput({ value, setValue, refresh = false }) {
  const [inputs, setInputs] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
  });
  //   const [input6, setInput6] = useState("");

  useMemo(() => {
    setValue(`${inputs.value1}${inputs.value2}${inputs.value3}${inputs.value4}`);
  }, [inputs]);
  useMemo(() => {
    setInputs({
      value1: "",
      value2: "",
      value3: "",
      value4: "",
    });
  }, [refresh]);
  const handleNextInput = (e) => {
    const fieldName = e.target.id;
    const fieldvalue = e.target.value;
    const nextSibiling = document.getElementById(`${Number(fieldName) + 1}`);

    if (nextSibiling !== null && fieldvalue.length > 0) {
      nextSibiling.focus();
    }
  };
  const handleLastInput = (e) => {
    const fieldName = e.target.id;
    const fieldvalue = e.target.value;
    const nextSibiling = document.getElementById(`${Number(fieldName) - 1}`);

    if (nextSibiling !== null && fieldvalue.length == 0) {
      nextSibiling.focus();
    }
  };

  const values = ["value1", "value2", "value3", "value4"];
  return (
    <div id="otp" className="flex flex-row justify-between items-center text-center px-2 mt-5 directon-ltr ">
      {values?.map((field, index) => (
        <>
          {" "}
          <input
            autoFocus={index == 0 ? true : false}
            className="m-2 border !text-lg font-medium border-gray-400 hover:border-primary-blue  focus:border-primary-blue h-10 w-10 text-center form-control rounded-lg"
            type="number"
            id={index + 1}
            maxLength="1"
            value={inputs[field]}
            onChange={(e) => {
              if (e.target.value.length <= 1) {
                inputs[field] = e.target.value;
                setInputs({ ...inputs });
              }
            }}
            onKeyUp={(e) => {
              if (e?.code == "Backspace" || e?.code == "Delete" || e?.keyCode == 8) {
                handleLastInput(e);
              } else {
                handleNextInput(e);
              }
            }}
          />
          {values?.length == index + 1 ? <></> : <p className="text-gray-400">-</p>}{" "}
        </>
      ))}
    </div>
  );
}

export default OtpInput;
