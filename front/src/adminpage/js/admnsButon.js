import React, { useState } from "react";
import AddButton from "./adminAddBtn";
import "./admnsButon.css"
import { Panel_PostData } from "./admnsdbPost";
import AddWagePanel from "./addPanel";

const AdminPanel = ({ onClose, locations : initlocations }) => {
  const [locations, setLocations] = useState(initlocations);
  const [showAddPanel, setShowAddPanel] = useState(false);
  // 일급 입력 상태 관리 (장소별로)
  const [wages, setWages] = useState(() => {
  const initial = {};
  //각 리스트에 장소를 key값으로 지정 -> 그 키값에 대한 value 값은 초기값으로 적용
    initlocations.forEach((loc) => {
      initial[loc] = "";  // 초기값 빈 문자열
    });
    return initial;
  });

  // 입력값 변경 처리
  const handleWageChange = (location, value) => {
    setWages((prev) => ({
      ...prev, //기존 객체 복사 
      [location]: value, // 기존값 덮어 쓰기
    }));
  };
  //리스트 삭제 처리
  const handleDeletLocation = (locationdelet) =>{
    setLocations((prev)=>prev.filter((loc)=>loc !== locationdelet ));

     // 삭제한 장소 wage도 같이 삭제 (옵션)
    setWages((prev) => {
      const copy = { ...prev };
      delete copy[locationdelet];
      return copy;
    });
  }
  const handleSave = async(e) => {
    e.preventDefault();
    const payLoad = {
      data_type: "payLoad",
      data : wages
    }
    try {
      const result = await Panel_PostData(payLoad);
      console.log("저장 성공", result);
      onClose();
    } catch (err) {
      alert("저장 중 오류 발생");
    }
    onClose();
  };
  const handleAddNewCompany = (company, wage) => {
    if (locations.includes(company)) {
      alert("이미 존재하는 회사입니다.");
      return;
    }
    setLocations((prev) => [...prev, company]);
    setWages((prev) => ({ ...prev, [company]: wage }));
  };


  return (
    <form className="adminpanelBk">
      <div className="modal-contents">
        <h2>일급 수정창</h2>
        <AddButton onAdd={() => setShowAddPanel(true)}></AddButton>
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
              <span 
                className="location-delete"
                style={{ cursor: "pointer" , marginLeft: 8 }}
                onClick={() => handleDeletLocation(location)}
              >x</span>
            </div>
          ))}
        </div>
        <div className="panelBtn">
          <button onClick={handleSave}>수정</button>
          <button onClick={onClose}>닫기</button>
        </div>

        {showAddPanel && (
        <AddWagePanel
          onSave={(company, wage) => {
            handleAddNewCompany(company, wage); // 회사 추가
            setShowAddPanel(false);             // 모달 닫기
          }}
          onClose={() => setShowAddPanel(false)} // 그냥 닫기
        />
      )}
      </div>
    </form>
  );
};

export default AdminPanel;
