import { useContext, useState , useEffect } from "react";
import UserContext from "../../login/js/userContext";
import '../css/activity.css'

const Option = ({ selectedDate }) => {
  const [records, setRecords] = useState([]);
  const [location, setLocation] = useState("");
  const [totalWorkTime, setTotalWorkTime] = useState("");
  const [showWorkTimes, setShowWorkTimes] = useState(false);
  const [workTime, setWorkTime] = useState("");        
  const [startTime, setStartTime] = useState("");      
  const [finishTime, setFinishTime] = useState("");     
  const [locationsList] = useState([
    "삼성전자(평택)", "삼성전자(기흥)", "삼성전자(아산)", "삼성전자(서울)",
    "LG전자(대전)", "LG전자(구미)", "SK하이닉스(이천)", "삼성디스플레이(온양)"
  ]);
  const [showLocations, setShowLocations] = useState(false);
  const { user } = useContext(UserContext);

  // 실시간으로 검색된 리스트를 필터링하는 함수

  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowLocations(false); // 선택 후 리스트를 닫음
  }; 
  const handleSelectWorkTime = (startTime, finishTime) => {
    setWorkTime(`${startTime}~${finishTime}`); // 전체 문자열도 저장 가능
    setStartTime(startTime); // 별도의 상태로 시작시간 저장 (useState 필요)
    setFinishTime(finishTime); // 별도의 상태로 끝나는시간 저장 (useState 필요)
    setShowWorkTimes(false);  // 선택 후 리스트 닫기
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !totalWorkTime) return;

    const formattedDate = selectedDate instanceof Date
      ? selectedDate.toLocaleDateString()
      : `${selectedDate.formatted}`;

    const getTimeString = (floatHours) => {
      const hours = Math.floor(floatHours);
      const minutes = Math.round((floatHours - hours) * 60);
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    };

    const newRecord = {
      data_type:"work_info",
        data :{ 
          user_name : user ,
          work_start : formattedDate + " " + startTime + ":00",
          work_end : formattedDate + " " + finishTime  + ":00",
          total_time : getTimeString(totalWorkTime),
          work_date : formattedDate,
          work_place : location, 
        }
    };

   fetch('http://127.0.0.1:8000/api/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecord), // 데이터가 정확히 JSON 형식으로 전송
    })
      .then((response) => response.json()) // 응답을 JSON으로 파싱
      .then((data) => {
        console.log('서버 응답:', data); // 서버 응답 확인
        console.log('서버에서 받은 JSON:', data.json); // 서버에서 받은 JSON 출력
        setRecords([...records, newRecord]);
        setLocation("");
        setTotalWorkTime("");
      })
      .catch((error) => {
        console.error('전송 중 오류 발생:', error);
      });
  };
    // 시간 차 계산 함수 (위에 함수 활용)
  function calculateDurationInHours(start, finish) {
    const [startH, startM] = start.split(":").map(Number);
    const [finishH, finishM] = finish.split(":").map(Number);

    const startTotalMinutes = startH * 60 + startM;
    const finishTotalMinutes = finishH * 60 + finishM;

    const diffMinutes = finishTotalMinutes - startTotalMinutes;
    let hours = diffMinutes > 0 ? diffMinutes / 60 : 0;
    if (hours > 4) {
      hours -= 1;
    }
    return hours;
  }
  // startTime 또는 finishTime 바뀔 때마다 totalWorkTime 자동 계산
  useEffect(() => {
    if (startTime && finishTime) {
      const duration = calculateDurationInHours(startTime, finishTime);
      setTotalWorkTime(duration ? duration : "");
    }
  }, [startTime, finishTime]);
  const workTimeList = [
    { startTime: "08:00", finishTime: "17:00" },
    { startTime: "08:30", finishTime: "17:30" },
    { startTime: "09:00", finishTime: "18:00" },
    { startTime: "09:30", finishTime: "18:30" },
    { startTime: "08:00", finishTime: "12:00" },
    { startTime: "08:30", finishTime: "12:30" },
    { startTime: "09:00", finishTime: "13:00" },
    { startTime: "09:30", finishTime: "13:30" },
    { startTime: "13:00", finishTime: "18:00" },
    { startTime: "13:30", finishTime: "18:30" },
  ];
  return(
    <form onSubmit={handleSubmit} className="space-y-3 relative">
      {/* 날짜 입력 */}
      <div className="relative">
        <input
          type="text"
          placeholder="작업 시간 선택"
          value={workTime}
          readOnly
        /> 
        <button
          type="button"
          className="absolute right-2 top-2 bg-gray-300 p-1 rounded"
          onClick={() => setShowWorkTimes(!showWorkTimes)}
          >
          +
        </button>
      </div>
      {/* 작업 시간 선택 리스트 */}
      {showWorkTimes && (
        <div className="absolute left-0 mt-1 w-full max-h-60 overflow-y-auto border rounded bg-white shadow-lg z-10">
          <div className="grid grid-cols-2 gap-2 p-2">
            {workTimeList.map(({ startTime, finishTime }, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectWorkTime(startTime, finishTime)}  // 두 개 인자로 넘김
                className="cursor-pointer p-2 border rounded hover:bg-blue-500 hover:text-white"
              >
                {startTime}~{finishTime}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 업체/장소 선택 */}
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

        {/* 장소 리스트 토글 */}
        {showLocations && (
          <div className="absolute left-0 mt-1 w-full max-h-60 overflow-y-auto border rounded bg-white shadow-lg transition-all duration-300 ease-in-out z-10">
            <div className="grid grid-cols-2 gap-2 p-2">
              {locationsList.map((loc, index) => (
                <div
                  key={index}
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

      {/* 작업 시간 입력 */}
       <input
        type="text"
        placeholder="총 작업 시간"
        value={totalWorkTime ? `${totalWorkTime}시간` : ""}
        readOnly
      />

      <button type="submit">추가</button>
    </form>
  );
};

export default Option;

