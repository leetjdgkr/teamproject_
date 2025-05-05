import { useState } from "react";
import '../css/activity.css'

const Option = ({ selectedDate }) => {
  const [records, setRecords] = useState([]);
  const [location, setLocation] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [locationsList] = useState([
    "삼성전자(평택)", "삼성전자(기흥)", "삼성전자(아산)", "삼성전자(서울)",
    "LG전자(대전)", "LG전자(구미)", "SK하이닉스(이천)", "삼성디스플레이(온양)"
  ]);
  const [showLocations, setShowLocations] = useState(false);

  // 실시간으로 검색된 리스트를 필터링하는 함수
  const filteredLocations = locationsList.filter((loc) =>
    loc.toLowerCase().includes(location.toLowerCase()) // 사용자가 입력한 값으로 필터링
  );

  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowLocations(false); // 선택 후 리스트를 닫음
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !workTime) return;

    const formattedDate = selectedDate instanceof Date
      ? selectedDate.toLocaleDateString()
      : `${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일`;

    const newRecord = {
      type:"Info",
        data :{ 
          calender_date: formattedDate,
          location,
          workTime,
        }
    };

   fetch('https://httpbin.org/post', {
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
        setWorkTime("");
      })
      .catch((error) => {
        console.error('전송 중 오류 발생:', error);
      });
  };

  return (
    <div className="activit y max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">작업 기록</h2>
      <form onSubmit={handleSubmit} className="space-y-3 relative">
        {/* 날짜 입력 */}
        <div className="relative">
          <input
            type="text"
            placeholder="날짜"
            value={selectedDate ? `${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일` : ""}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>

        {/* 업체/장소 선택 */}
        <div className="relative">
          <input
            type="text"
            placeholder="업체/장소"
            value={location}
            onChange={(e) => setLocation(e.target.value)}  // 입력값에 따라 필터링
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
          {showLocations && location && (  // location이 비어있지 않으면 필터링된 장소들만 표시
            <div className="absolute left-0 mt-1 w-full max-h-60 overflow-y-auto border rounded bg-white shadow-lg transition-all duration-300 ease-in-out">
              {/* 필터링된 장소 리스트 */}
              <div className="grid grid-cols-2 gap-2 p-2">
                {filteredLocations.map((loc, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer p-3 text-center border rounded-lg ${location === loc ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
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
          placeholder="작업 시간"
          value={workTime}
          onChange={(e) => setWorkTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          추가
        </button>
      </form>

      {/* 작업 기록 리스트 */}
      <ul className="mt-5">
        {records.map((record, index) => (
          <li key={index} className="p-2 border-b">
            {record.date} | {record.location} | {record.workTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Option;

