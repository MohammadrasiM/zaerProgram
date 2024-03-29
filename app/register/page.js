"use client";
import FormInputs from "@/components/shared/form/FormInputs";
import FormSelect from "@/components/shared/form/FormSelect";
import SimpleTimePicker from "@/components/widget/SimpleTimePicker";
import React, { useState } from "react";
import { citites, dispatchMethod, dispatchPlaces, insurancePolicies, sexList } from "@/utils/constants";
import RegisterGroup from "@/components/RegisterGroup";
import FixedButton from "@/components/shared/button/FixedButton";
import Button from "@/components/shared/button/Button";
import { Divider } from "@/components/shared/Divider";
import moment from "moment-jalaali";

import Cities from "@/helpers/cities";
import Checkbox from "@/components/shared/Checkbox";

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
    dispatch_method: "",
  });
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfDispatch, setDateOfDispatch] = useState(null);
  const [agree, setAgree] = useState(false);
  const onChange = (key, value) => {
    setData((e) => ({ ...e, [key]: value }));
  };
  const thisYear = moment().format("jYYYY");

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
      <SimpleTimePicker setValue={setDateOfBirth} title={"تاریخ تولد"} />
      <div className="grid grid-cols-1 mt-4 gap-4 md:grid-cols-2">
        {" "}
        <FormInputs
          value={data?.em_phone}
          onChangeText={(e) => onChange("em_phone", e)}
          item={{ keyboard: "number", title: "تلفن ضروری", maxLength: 13 }}
        />
        <FormInputs
          value={data?.mobile}
          onChangeText={(e) => onChange("mobile", e)}
          item={{ keyboard: "number", title: "موبایل", maxLength: 13 }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {" "}
        <FormSelect
          parentClass="my-4"
          title={"استان"}
          titleClass="mr-4"
          isSearchable={false}
          list={Cities}
          property={"name"}
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
          list={Cities?.find((x) => x?.id == data?.provience)?.cities || []}
          property={"name"}
          onSelect={(v) => {
            onChange("city", v.id);
          }}
          value={data?.city || null}
        />
      </div>{" "}
      <FormInputs value={data?.em_phone} onChangeText={(e) => onChange("address", e)} item={{ title: "آدرس" }} />
      <FormInputs
        value={data?.post_code}
        onChangeText={(e) => onChange("post_code", e)}
        item={{ keyboard: "number", title: "کد پستی", maxLength: 10 }}
      />
      <Divider moreClass={"mt-4"} />
      <p className="my-4"> اطلاعات مرزی :</p>
      <FormSelect
        parentClass="my-4"
        title={"مرز خروجی"}
        titleClass="mr-4"
        isSearchable={false}
        list={dispatchPlaces}
        property={"title"}
        onSelect={(v) => {
          onChange("exit_border", v.id);
        }}
        value={data?.exit_border || null}
      />
      <SimpleTimePicker
        setValue={setDateOfDispatch}
        title={"تاریخ رفت"}
        mandatoryListYear={[{ name: thisYear, id: thisYear }]}
        mandatoryListMonth={[
          { name: 5, id: 5 },
          { name: 6, id: 6 },
        ]}
      />
      <div className="my-4"></div>
      <FormSelect
        parentClass="my-4"
        title={"مرز برگشت"}
        titleClass="mr-4"
        isSearchable={false}
        list={dispatchPlaces}
        property={"title"}
        onSelect={(v) => {
          onChange("return_border", v.id);
        }}
        value={data?.return_border || null}
      />{" "}
      <SimpleTimePicker
        setValue={setDateOfDispatch}
        title={"تاریخ برگشت"}
        mandatoryListYear={[{ name: thisYear, id: thisYear }]}
        mandatoryListMonth={[
          { name: 5, id: 5 },
          { name: 6, id: 6 },
        ]}
      />
      <FormSelect
        parentClass="my-4"
        title={"نحوه عزیمت"}
        titleClass="mr-4"
        isSearchable={false}
        list={dispatchMethod}
        property={"title"}
        onSelect={(v) => {
          onChange("dispatch_method", v.id);
        }}
        value={data?.dispatch_method || null}
      />
      {/* <Divider moreClass={"my-4"} /> */}
      {/* <FormInputs item={{ title: "کد ملی سرگروه" }} /> */}
      <RegisterGroup data={data} onChange={onChange} />
      <div className="flex items-center mb-4 gap-4">
        <Checkbox
          title={"asf"}
          isChecked={agree}
          onSelect={() => {
            setAgree(!agree);
          }}
        />
        <div>شرایط و مقررات را قبول دارم</div>
      </div>
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
