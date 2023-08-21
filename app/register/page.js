"use client";
import FormInputs from "@/components/shared/form/FormInputs";
import FormSelect from "@/components/shared/form/FormSelect";
import SimpleTimePicker from "@/components/widget/SimpleTimePicker";
import React, { useState } from "react";
import { citites, insurancePolicies, sexList } from "@/utils/constants";
import RegisterGroup from "@/components/RegisterGroup";
import FixedButton from "@/components/shared/button/FixedButton";
import Button from "@/components/shared/button/Button";
import { Divider } from "@/components/shared/Divider";

const Register = () => {
  const [data, setData] = useState({
    code_meli: "",
    first_name: "",
    last_name: "",
    exit_border: "",
    provience: "",
    city: "",
    return_border: "",
    sex: "",
    em_phone: "",
    address: "",
    post_code: "",
    mobile: "",
    group_leader: "",
    insurance: "",
  });
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfDispatch, setDateOfDispatch] = useState(null);
  const onChange = (key, value) => {
    setData((e) => ({ ...e, [key]: value }));
  };

  return (
    <div className="container !pt-0 min-h-screen h-fit  relative">
      <img src="/assets/images/ziarat.png" className="w-[25%]  my-8 aspect-auto mx-auto object-cover max-w-[220px]" />
      <p className="my-4"> مشخصات فردی :</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormInputs
          value={data?.code_meli}
          onChangeText={(e) => onChange("code_meli", e)}
          item={{ keyboard: "number", title: "کد ملی", maxLength: 10 }}
        />
        <FormInputs item={{ title: "نام" }} value={data?.first_name} onChangeText={(e) => onChange("first_name", e)} />
        <FormInputs
          item={{ title: "نام خانوادگی" }}
          value={data?.last_name}
          onChangeText={(e) => onChange("last_name", e)}
        />
      </div>{" "}
      <Divider moreClass={"mt-4"} />
      <SimpleTimePicker setValue={setDateOfBirth} title={"تاریخ تولد"} />
      <Divider moreClass={"mt-4"} />
      <FormSelect
        parentClass="my-4"
        title={"مرز خروج"}
        titleClass="mr-4"
        isSearchable={false}
        list={citites}
        property={"title"}
        onSelect={(v) => {
          onChange("exit_border", v.id);
        }}
        value={data?.exit_border || null}
      />
      <SimpleTimePicker setValue={setDateOfDispatch} title={"تاریخ خروج"} />
      <Divider moreClass={"mt-4"} />
      <div className="grid grid-cols-2 gap-4">
        {" "}
        <FormSelect
          parentClass="my-4"
          title={"استان"}
          titleClass="mr-4"
          isSearchable={false}
          list={citites}
          property={"title"}
          onSelect={(v) => {
            onChange("provience", v.id);
          }}
          value={data?.provience || null}
        />
        <FormSelect
          parentClass="my-4"
          title={"شهرستان"}
          titleClass="mr-4"
          isSearchable={false}
          list={citites}
          property={"title"}
          onSelect={(v) => {
            onChange("city", v.id);
          }}
          value={data?.city || null}
        />
      </div>{" "}
      <Divider moreClass={"my-4"} />
      <SimpleTimePicker setValue={setDateOfDispatch} title={"تاریخ برگشت"} />
      <FormSelect
        parentClass="my-4"
        title={"مرز برگشت"}
        titleClass="mr-4"
        isSearchable={false}
        list={citites}
        property={"title"}
        onSelect={(v) => {
          onChange("return_border", v.id);
        }}
        value={data?.return_border || null}
      />{" "}
      <Divider moreClass={"my-4"} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {" "}
        <FormInputs
          value={data?.em_phone}
          onChangeText={(e) => onChange("em_phone", e)}
          item={{ keyboard: "number", title: "تلفن ضروری", maxLength: 13 }}
        />
        <FormInputs
          value={data?.post_code}
          onChangeText={(e) => onChange("post_code", e)}
          item={{ keyboard: "number", title: "کد پستی", maxLength: 10 }}
        />
      </div>
      <FormInputs value={data?.em_phone} onChangeText={(e) => onChange("address", e)} item={{ title: "آدرس" }} />
      <Divider moreClass={"my-4"} />
      <FormInputs
        value={data?.mobile}
        onChangeText={(e) => onChange("mobile", e)}
        item={{ keyboard: "number", title: "موبایل", maxLength: 13 }}
      />
      <FormSelect
        parentClass="my-4"
        title={"جنسیت"}
        titleClass="mr-4"
        isSearchable={false}
        list={sexList}
        property={"title"}
        onSelect={(v) => {
          onChange("sex", v.id);
        }}
        value={data?.sex || null}
      />
      <FormInputs item={{ title: "کد ملی سرگروه" }} />
      <RegisterGroup data={data} onChange={onChange} />
      <Button
        containerClass="w-full"
        width="w-full"
        disable={false}
        rules={false}
        loading={false}
        onClick={() => {
          validOtp();
        }}
        title={"تایید"}
      />
      {/*       
      <FixedButton
        disable={false}
        rules={false}
        loading={false}
        onClick={() => {
          validOtp();
        }}
        title={"تایید"}
      /> */}
    </div>
  );
};

export default Register;
