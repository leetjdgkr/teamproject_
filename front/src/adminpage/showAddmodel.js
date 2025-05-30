import React, { useState } from "react";

const AddPersonModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    people: "",
    birthday: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.people || !formData.birthday || !formData.phoneNumber) {
      alert("모든 필드를 입력하세요");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>새 사람 추가</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="people"
            placeholder="이름"
            value={formData.people}
            onChange={handleChange}
          />
          <input
            name="birthday"
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