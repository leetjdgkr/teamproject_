import { useState } from "react";

const Option = ({ selectedDate }) => {
  const [records, setRecords] = useState([]);
  const [location, setLocation] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [locationsList, setLocationsList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchLocations = () => {
    // 이 부분에 실제로 필요한 장소 목록을 불러오거나 고정값을 설정합니다.
    const data = [ "삼성전자(평택)", "삼성전자(기흥)", "삼성전자(아산)", "삼성전자(서울)" ];
    setLocationsList(data);
    setShowDropdown(true);
  };

  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location || !workTime) return;

    const newRecord = {
      date: selectedDate.toLocaleDateString(), // 선택된 날짜 표시
      location,
      workTime,
    };
    setRecords([...records, newRecord]);

    setLocation("");
    setWorkTime("");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">작업 기록</h2>
      <form onSubmit={handleSubmit} className="space-y-3 relative">
        {/* 업체/장소 입력과 드롭다운 버튼 */}
        <div className="relative">
          <input
            type="text"
            placeholder="날짜"
            value={ selectedDate ? `${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일` : "" }
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
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
            onClick={fetchLocations}
            className="absolute right-2 top-2 bg-gray-300 p-1 rounded"
          >
            +
          </button>
          {showDropdown && (
            <ul className="absolute left-0 mt-1 w-full border rounded bg-white shadow-lg">
              {locationsList.map((loc, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectLocation(loc)}
                >
                  {loc}
                </li>
              ))}
            </ul>
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

