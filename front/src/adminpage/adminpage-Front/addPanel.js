import React, { useState } from "react";

const AddWagePanel = ({ onSave, onClose }) => {
  const [company, setCompany] = useState("");
  const [wage, setWage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !wage) {
      alert("회사명과 일급을 입력하세요.");
      return;
    }
    onSave(company, wage);  // 저장 콜백 호출
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>회사 추가</h3>
        <input
          placeholder="회사명"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          placeholder="일급"
          value={wage}
          onChange={(e) => setWage(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>저장</button>
        <button type="button" onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default AddWagePanel;
