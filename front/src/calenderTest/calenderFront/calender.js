import { useState, useContext } from 'react';
import { subMonths, addMonths } from "date-fns";
import Option from "./index";
import '../css/calender.css';
import UserContext from "../../login/js/userContext";

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
  const [showOption, setShowOption] = useState(false);
  const { user } = useContext(UserContext);

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstMonth = new Date(year, month, 1);
  const startDay = new Date(firstMonth);
  startDay.setDate(startDay.getDate() - startDay.getDay());

  const lastDayOfMonth = new Date(year, month + 1, 0);
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  const weeks = groupDatesByWeek(startDay, endDay);

  // ✨ 날짜 선택 핸들러
  const handleOnTarget = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = dateObj.getMonth() + 1;
    const d = dateObj.getDate();

    const padded = (n) => String(n).padStart(2, '0');

    setSelectedDate({
      year: y,
      month: m,
      day: d,
      formatted: `${y}-${padded(m)}-${padded(d)}`,
    });

    setShowOption(true);
  };

  const isSelected = (day) =>
    selectedDate &&
    selectedDate.day === day.getDate() &&
    selectedDate.month === day.getMonth() + 1 &&
    selectedDate.year === day.getFullYear();

  return (
    <div className="calenderbk">
      <div className="calender_sub">
        <div>
          <h2>{user}님</h2>
        </div>
        <div className="calender-check">
          <button onClick={() => setDate(subMonths(date, 1))}>이전 달</button>
          <span>{year}년 {month + 1}월</span>
          <button onClick={() => setDate(addMonths(date, 1))}>다음 달</button>
        </div>

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
                  <td
                    key={j}
                    onClick={() => handleOnTarget(day)}
                    style={{
                      backgroundColor: isSelected(day) ? "lightblue" : "transparent",
                      color:
                        day.getMonth() !== month
                          ? "lightgray"
                          : day.getDay() === 0
                          ? "red"
                          : day.getDay() === 6
                          ? "blue"
                          : "black",
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

      {/* ✨ 선택 시 옵션 표시 */}
      {showOption && <Option selectedDate={selectedDate} />}
    </div>
  );
};

export default Calendar;
