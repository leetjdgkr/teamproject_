import React, { useState } from "react";
import "./admnsButon.css"

const AdminPanel = ({ onClose, locations }) => {
  // 일급 입력 상태 관리 (장소별로)
  const [wages, setWages] = useState(() => {
    const initial = {};
    locations.forEach((loc) => {
      initial[loc] = "";  // 초기값 빈 문자열
    });
    return initial;
  });

  // 입력값 변경 처리
  const handleWageChange = (location, value) => {
    setWages((prev) => ({
      ...prev,
      [location]: value,
    }));
  };

  const handleSave = () => {
    console.log("저장된 일급 데이터:", wages);
    // 여기서 API 호출하거나 부모 컴포넌트로 전달 가능
    onClose();
  };

  return (
    <div className="adminpanelBk">
      <div className="modal-contents">
        <h2>일급 수정창</h2>
        <div className="activeModal">
          {locations.map((location, idx) => (
            <div key={idx} className="location-wage-item">
              <span className="location-name">{location}</span>
              <input
                type="text"
                placeholder="일급 입력"
                value={wages[location]}
                onChange={(e) => handleWageChange(location, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="panelBtn">
          <button onClick={handleSave}>수정</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
