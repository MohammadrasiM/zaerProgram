import React from "react";
import FormInputs from "../shared/form/FormInputs";
import { insurancePolicies } from "@/utils/constants";
import FormSelect from "../shared/form/FormSelect";

const RegisterGroup = ({ setData, data, onChange }) => {
  return (
    <div className="py-6 border-gray-300 my-8 border-y">
      <FormSelect
        parentClass="my-4"
        title={"نوع بیمه نامه"}
        titleClass="mr-4"
        isSearchable={false}
        list={insurancePolicies}
        property={"title"}
        onSelect={(v) => {
          onChange("insurance", v.id);
        }}
        value={data?.insurance || null}
      />
    </div>
  );
};

export default RegisterGroup;
