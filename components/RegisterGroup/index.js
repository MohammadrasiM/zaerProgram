import React from "react";
import FormInputs from "../shared/form/FormInputs";

const RegisterGroup = ({ setData, data }) => {
  return (
    <div className="py-6 border-gray-300 my-8 border-y">
      <FormInputs item={{ title: "سرگروه" }} />
    </div>
  );
};

export default RegisterGroup;
