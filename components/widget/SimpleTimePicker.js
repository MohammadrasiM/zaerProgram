import React from "react";
import { useState, useMemo } from "react";
import FormSelect from "../shared/form/FormSelect";
import moment from "moment-jalaali";
function SimpleTimePicker({ title, setValue, mandatoryListYear, mandatoryListMonth }) {
  const [dates, setDates] = useState([
    {
      title: "روز",
      value: "",
      list: [],
    },
    {
      title: "ماه",
      value: "",
      list: mandatoryListMonth
        ? mandatoryListMonth
        : [
            { name: 1, id: 1 },
            { name: 2, id: 2 },
            { name: 3, id: 3 },
            { name: 4, id: 4 },
            { name: 5, id: 5 },
            { name: 6, id: 6 },
            { name: 7, id: 7 },
            { name: 8, id: 8 },
            { name: 9, id: 9 },
            { name: 10, id: 10 },
            { name: 11, id: 11 },
            { name: 12, id: 12 },
          ],
    },

    {
      title: "سال",
      value: mandatoryListYear ? mandatoryListYear[0]?.id : "",
      list: mandatoryListYear
        ? mandatoryListYear
        : Array.from({ length: 180 }, (e, i) => {
            // return { id: i + 1, reserved: i % 2 ? 1 : i % 3 ? 2 : i + (1 % 5) ? 3 : "free", month: month, year: year };
            return {
              id: i + 1280,
              name: i + 1280,
            };
          }),
    },
  ]);
  function onSelect(title, value) {
    if (title == "ماه" || title == "سال") {
      dates[0].list = [];
      dates[0].value = "";
    }
    const index = dates.findIndex((x) => x.title == title);
    dates[index].value = value;
    setDates([...dates]);
  }

  useMemo(() => {
    if (dates[2].value && dates[1].value && dates[0].list.length == 0) {
      let newArr = [];
      const days = moment.jDaysInMonth(dates[2].value, dates[1].value);
      for (let i = 1; i <= days; i++) {
        newArr.push({ name: i, id: i });
      }
      dates[0].list = newArr;
      setDates([...dates]);
    }
    setValue(`${dates[2].value}/${dates[1].value}/${dates[0].value}`);
  }, [dates]);

  return (
    <div className="flex flex-col">
      <div className="flex text-sm font-light items-center mb-2">
        {/* <img src="/assets/icons/dashboard/calender.svg" className="w-5 dark:invert" /> */}
        <p className="mr-2 font-normal text-sm">{title}</p>
      </div>
      <div className="grid grid-cols-3  gap-2">
        {dates?.map((item) => (
          <FormSelect
            key={item?.id}
            titleClass="mr-4"
            item={{
              placeholder: item?.title,
              disabled: (item?.title == "ماه" && !dates[2]?.value) || (item?.title == "روز" && !dates[1]?.value),
            }}
            isSearchable={true}
            list={item?.list}
            property={"name"}
            onSelect={(v) => {
              onSelect(item?.title, v.id);
            }}
            value={item?.value}
            title={""}
            parentClass={"w-full cursor-pointer"}
          />
        ))}
      </div>
    </div>
  );
}

export default SimpleTimePicker;
