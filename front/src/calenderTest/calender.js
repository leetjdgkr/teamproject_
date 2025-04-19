import { useState } from "react";
import { subMonths, addMonths } from "date-fns";
import Option from "./index";

const groupDatesByWeek = (startDay, endDay) => {
  const weeks = [];
  let currentWeek = [];
  let currentDate = new Date(startDay);

  while (currentDate <= endDay) {
    currentWeek.push(new Date(currentDate));

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  while (weeks.length < 6) {
    const lastWeek = weeks[weeks.length - 1];
    const lastDate = new Date(lastWeek[lastWeek.length - 1]);

    let extraWeek = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(lastDate);
      newDate.setDate(lastDate.getDate() + i + 1);
      extraWeek.push(newDate);
    }

    weeks.push(extraWeek);
  }

  return weeks;
};

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstMonth = new Date(year, month, 1);
  const startDay = new Date(firstMonth);
  startDay.setDate(startDay.getDate() - startDay.getDay());

  const lastDayOfMonth = new Date(year, month + 1, 0);
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  const weeks = groupDatesByWeek(startDay, endDay);

  const hadleOntarget = (year,month, day) => {
    setSelectedDate({"year":year, "month":month, "day":day});
  };
    return (
        <div>
        <div>
            <button onClick={() => setDate(subMonths(date, 1))}>이전 달</button>
            <span>{year}년 {month + 1}월</span>
            <button onClick={() => setDate(addMonths(date, 1))}>다음 달</button>
            <table>
                <thead>
                <tr>
                    <th>일</th>
                    <th>월</th>
                    <th>화</th>
                    <th>수</th>
                    <th>목</th>
                    <th>금</th>
                    <th>토</th>
                </tr>
                    </thead>
                <tbody>
                {weeks.map((week, i) => (
                    <tr key={i}>
                    {week.map((day, j) => (
                        <td key={j} onClick={()=>hadleOntarget(year,day.getMonth()+1,day.getDate())}
                            style={{
                                color: day.getMonth() === month ? "black" : "lightgray"
                            }}
                        >
                        {day.getDate()}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
        </table>
      </div>
      <Option selectedDate={selectedDate} />
    </div>
  );
};

export default Calendar;
