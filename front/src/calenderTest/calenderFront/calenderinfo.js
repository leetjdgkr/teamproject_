import { useContext, useState, useEffect } from "react";
import UserContext from "../../login/js/userContext";
import locationsList from "../js/locationsList";
import workTimeList from "../js/workTimeList";
import { calculateDurationInHM } from "../js/timeUtils";
import submitWorkInfo from "../js/submitWorkInfo";
import '../css/activity.css';

const Option = ({ selectedDate }) => {
  const [records, setRecords] = useState([]);
  const [location, setLocation] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [totalWorkTime, setTotalWorkTime] = useState("");
  const [showWorkTimes, setShowWorkTimes] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  const { user, employeeNumber } = useContext(UserContext);

  // 잔업, 중식, 특근 상태 (시작, 종료, 총시간, 체크박스)
  const [overtimeChecked, setOvertimeChecked] = useState(false);
  const [overtimeStart, setOvertimeStart] = useState("");
  const [overtimeFinish, setOvertimeFinish] = useState("");
  const [overtimeDuration, setOvertimeDuration] = useState("");

  const [lunchChecked, setLunchChecked] = useState(false);
  const [lunchStart, setLunchStart] = useState("");
  const [lunchFinish, setLunchFinish] = useState("");
  const [lunchDuration, setLunchDuration] = useState("");

  const [specialWorkChecked, setSpecialWorkChecked] = useState(false);
  const [specialWorkStart, setSpecialWorkStart] = useState("");
  const [specialWorkFinish, setSpecialWorkFinish] = useState("");
  const [specialWorkDuration, setSpecialWorkDuration] = useState("");

  // 시간 제한 및 HH:mm 자동 포맷 함수
  const formatTimeInput = (value) => {
    let cleaned = value.replace(/[^0-9]/g, "");

    if (cleaned.length === 0) return "";

    let hour = cleaned.slice(0, 2);
    let minute = cleaned.slice(2, 4);

    // 시간 유효성 검사
    if (hour.length === 1) {
      if (Number(hour) > 2) hour = "2";
    } else if (hour.length === 2) {
      if (Number(hour) > 24) hour = "24";
    }

    // 분 유효성 검사
    if (minute.length === 1) {
      if (Number(minute) > 5) minute = "5";
    } else if (minute.length === 2) {
      if (Number(minute) > 59) minute = "59";
    }

    if (minute.length === 0) return hour;
    return `${hour}:${minute}`;
  };

  // 메인 작업 시간 선택 처리
  const handleSelectWorkTime = (start, finish) => {
    setStartTime(start);
    setFinishTime(finish);
    setWorkTime(`${start}~${finish}`);
    setShowWorkTimes(false);
  };

  const handleSelectLocation = (loc) => {
    setLocation(loc);
    setShowLocations(false);
  };

  // 총 작업 시간 계산 (메인 작업)
  useEffect(() => {
    if (startTime && finishTime) {
      const duration = calculateDurationInHM(startTime, finishTime);
      setTotalWorkTime(duration);
    } else {
      setTotalWorkTime("");
    }
  }, [startTime, finishTime]);

  // 잔업, 중식, 특근 총시간 계산
  useEffect(() => {
    if (overtimeStart && overtimeFinish) {
      setOvertimeDuration(calculateDurationInHM(overtimeStart, overtimeFinish));
    } else {
      setOvertimeDuration("");
    }
  }, [overtimeStart, overtimeFinish]);

  useEffect(() => {
    if (lunchStart && lunchFinish) {
      setLunchDuration(calculateDurationInHM(lunchStart, lunchFinish));
    } else {
      setLunchDuration("");
    }
  }, [lunchStart, lunchFinish]);

  useEffect(() => {
    if (specialWorkStart && specialWorkFinish) {
      setSpecialWorkDuration(calculateDurationInHM(specialWorkStart, specialWorkFinish));
    } else {
      setSpecialWorkDuration("");
    }
  }, [specialWorkStart, specialWorkFinish]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location || !totalWorkTime) {
      alert("장소와 작업시간을 입력해주세요.");
      return;
    }

    try {
      const { data, newRecord } = await submitWorkInfo({
        user,
        employeeNumber,
        selectedDate,
        startTime,
        finishTime,
        totalWorkTime,

        location,

        // 잔업
        overtimeChecked,
        overtimeStart: overtimeChecked ? overtimeStart : "",
        overtimeFinish: overtimeChecked ? overtimeFinish : "",
        overtimeDuration: overtimeChecked ? overtimeDuration : "",

        // 중식
        lunchChecked,
        lunchStart: lunchChecked ? lunchStart : "",
        lunchFinish: lunchChecked ? lunchFinish : "",
        lunchDuration: lunchChecked ? lunchDuration : "",

        // 특근
        specialWorkChecked,
        specialWorkStart: specialWorkChecked ? specialWorkStart : "",
        specialWorkFinish: specialWorkChecked ? specialWorkFinish : "",
        specialWorkDuration: specialWorkChecked ? specialWorkDuration : "",
      });

      console.log("서버 응답:", data);
      setRecords([...records, newRecord]);

      // 초기화
      setLocation("");
      setStartTime("");
      setFinishTime("");
      setWorkTime("");
      setTotalWorkTime("");

      setOvertimeChecked(false);
      setOvertimeStart("");
      setOvertimeFinish("");
      setOvertimeDuration("");

      setLunchChecked(false);
      setLunchStart("");
      setLunchFinish("");
      setLunchDuration("");

      setSpecialWorkChecked(false);
      setSpecialWorkStart("");
      setSpecialWorkFinish("");
      setSpecialWorkDuration("");
    } catch (error) {
      console.error("전송 중 오류 발생:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 relative">

      {/* 작업 시간 선택 */}
      <div className="relative">
        <input type="text" className="white-input" placeholder="작업 시간 선택" value={workTime}  disabled />
        <button
          type="button"
          onClick={() => setShowWorkTimes(!showWorkTimes)}
          className="absolute right-2 top-2 bg-gray-300 p-1 rounded"
        >
          +
        </button>
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
      </div>

      {/* 장소 선택 및 입력 */}
      <div className="relative">
        <input
          type="text"
          placeholder="업체/장소"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded white-input"
          disabled
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
              {locationsList.map((loc, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer p-3 text-center border rounded-lg ${
                    location === loc ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}
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
      <input type="text" className="white-input" placeholder="총 작업 시간" value={totalWorkTime}  disabled />

      {/* 잔업, 중식, 특근 섹션 */}
      <div className="space-y-6 mt-4">

        {/* 잔업 */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={overtimeChecked}
              onChange={() => setOvertimeChecked(!overtimeChecked)}
            />
            <span>잔업</span>
          </label>
          {overtimeChecked && (
            <div className="flex space-x-2 mt-1 items-center">
              <input
                type="text"
                placeholder="시작시간 (예 : 17:30)"
                value={overtimeStart}
                maxLength={5}
                onChange={(e) => setOvertimeStart(formatTimeInput(e.target.value))}
                className="p-2 border rounded w-24"
              />
              <span>~</span>
              <input
                type="text"
                placeholder="종료시간 (예 : 19:30)"
                value={overtimeFinish}
                maxLength={5}
                onChange={(e) => setOvertimeFinish(formatTimeInput(e.target.value))}
                className="p-2 border rounded w-24"
              />
              <span>{overtimeDuration}</span>
            </div>
          )}
        </div>

        {/* 중식 */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={lunchChecked}
              onChange={() => setLunchChecked(!lunchChecked)}
            />
            <span>중식</span>
          </label>
          {lunchChecked && (
            <div className="flex space-x-2 mt-1 items-center">
              <input
                type="text"
                placeholder="시작시간 (예 : 12:30)"
                value={lunchStart}
                maxLength={5}
                onChange={(e) => setLunchStart(formatTimeInput(e.target.value))}
                className="p-2 border rounded w-24"
              />
              <span>~</span>
              <input
                type="text"
                placeholder="종료시간 (예 : 13:30)"
                value={lunchFinish}
                maxLength={5}
                onChange={(e) => setLunchFinish(formatTimeInput(e.target.value))}
                className="p-2 border rounded w-24"
              />
              <span>{lunchDuration}</span>
            </div>
          )}
        </div>

        {/* 특근 */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={specialWorkChecked}
              onChange={() => setSpecialWorkChecked(!specialWorkChecked)}
            />
            <span>특근</span>
          </label>
          {specialWorkChecked && (
            <div className="flex space-x-2 mt-1 items-center">
              <input
                type="text"
                placeholder="시작시간 (예 : 17:30)"
                value={specialWorkStart}
                maxLength={5}
                onChange={(e) => setSpecialWorkStart(formatTimeInput(e.target.value))}
                className="p-2 border rounded w-24"
              />
              <span>~</span>
              <input
                type="text"
                placeholder="종료시간 (예 : 17:30)"
                value={specialWorkFinish}
                maxLength={5}
                onChange={(e) => setSpecialWorkFinish(formatTimeInput(e.target.value))}
                className="p-2 border rounded w-24"
              />
              <span>{specialWorkDuration}</span>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        추가
      </button>
    </form>
  );
};

export default Option;




