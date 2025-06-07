import { useContext, useState, useEffect } from "react";
import UserContext from "../../login/js/userContext";
import locationsList from "../js/locationsList";
import workTimeList from "../js/workTimeList";
import { calculateDurationInHours, convertHoursToHMS } from "../js/timeUtils";
import submitWorkInfo from "../js/submitWorkInfo";
import '../css/activity.css';

const Option = ({ selectedDate }) => {
  const [records, setRecords] = useState([]);
  const [location, setLocation] = useState("");
  const [totalWorkTime, setTotalWorkTime] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [showWorkTimes, setShowWorkTimes] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  const { user, employeeNumber } = useContext(UserContext);

  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowLocations(false);
  };

  const handleSelectWorkTime = (startTime, finishTime) => {
    setWorkTime(`${startTime}~${finishTime}`);
    setStartTime(startTime);
    setFinishTime(finishTime);
    setShowWorkTimes(false);
  };

  useEffect(() => {
    if (startTime && finishTime) {
      const duration = calculateDurationInHours(startTime, finishTime);
      setTotalWorkTime(duration || "");
    }
  }, [startTime, finishTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location || !totalWorkTime) return;

    const totalTimeString = convertHoursToHMS(totalWorkTime);

    try {
      const { data, newRecord } = await submitWorkInfo({
        user,
        employeeNumber,
        selectedDate,
        startTime,
        finishTime,
        totalWorkTime: totalTimeString,
        location,
      });

      console.log("서버 응답:", data);
      setRecords([...records, newRecord]);
      setLocation("");
      setTotalWorkTime("");
    } catch (error) {
      console.error("전송 중 오류 발생:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 relative">
      {/* 작업 시간 */}
      <div className="relative">
        <input type="text" placeholder="작업 시간 선택" value={workTime} readOnly />
        <button type="button" onClick={() => setShowWorkTimes(!showWorkTimes)} className="absolute right-2 top-2 bg-gray-300 p-1 rounded">+</button>
      </div>

      {showWorkTimes && (
        <div className="absolute left-0 mt-1 w-full max-h-60 overflow-y-auto border rounded bg-white shadow-lg z-10">
          <div className="grid grid-cols-2 gap-2 p-2">
            {workTimeList.map(({ startTime, finishTime }, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectWorkTime(startTime, finishTime)}
                className="cursor-pointer p-2 border rounded hover:bg-blue-500 hover:text-white"
              >
                {startTime}~{finishTime}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 장소 입력 */}
      <div className="relative">
        <input
          type="text"
          placeholder="업체/장소"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="button"
          onClick={() => setShowLocations(!showLocations)}
          className="absolute right-2 top-2 bg-gray-300 p-1 rounded"
        >
          +
        </button>

        {showLocations && (
          <div className="absolute left-0 mt-1 w-full max-h-60 overflow-y-auto border rounded bg-white shadow-lg z-10">
            <div className="grid grid-cols-2 gap-2 p-2">
              {locationsList.map((loc, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-3 text-center border rounded-lg ${location === loc ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                  onClick={() => handleSelectLocation(loc)}
                >
                  {loc}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 총 작업 시간 */}
      <input type="text" placeholder="총 작업 시간" value={totalWorkTime ? `${totalWorkTime}시간` : ""} readOnly />

      <button type="submit">추가</button>
    </form>
  );
};

export default Option;


