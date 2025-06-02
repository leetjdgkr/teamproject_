import React, { useState, useEffect } from "react";

const AddPersonModal = ({ onSave, onClose, existingEmployees }) => {
  const [formData, setFormData] = useState({
    employeeNumber: "",
    people: "",
    birthday: "",
    phoneNumber: "",
  });

  // 사원번호 자동 생성 함수
 const generateEmployeeNumber = () => {
    const prefix = "SEOSAN";
    const numbers = existingEmployees
      .map((e) => parseInt(e.company?.split('_')[1]))
      .filter((n) => !isNaN(n));
    const last = numbers.length > 0 ? Math.max(...numbers) : 0;
    return `${prefix}_${String(last + 1).padStart(3, "0")}`;
  };
  // 모달 열릴 때 한 번만 사원번호 생성
 useEffect(() => {
    if (existingEmployees && existingEmployees.length >= 0) {
      const newNumber = generateEmployeeNumber();
      setFormData((prev) => ({ ...prev, employeeNumber: newNumber }));
    }
  }, [existingEmployees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { people, birthday, phoneNumber, employeeNumber } = formData;
    if (!people || !birthday || !phoneNumber) {
      alert("모든 필드를 입력하세요");
      return;
    }
    onSave({
      people,
      birthday,
      phoneNumber,
      company: employeeNumber, // 키 이름 맞춤
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>새 사람 추가</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <strong>사원번호: </strong>
            <span>{formData.employeeNumber}</span>
          </div>
          <input
            name="people"
            placeholder="이름"
            value={formData.people}
            onChange={handleChange}
          />
          <input
            name="birthday"
            type = "date"
            placeholder="생년월일"
            value={formData.birthday}
            onChange={handleChange}
          />
          <input
            name="phoneNumber"
            placeholder="전화번호"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <button type="submit">저장</button>
          <button type="button" onClick={onClose}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;
