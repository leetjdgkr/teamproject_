import React from "react";
import { useAddPersonLogic } from "../js/useAddPersonLogic"; // 경로 확인!
import "../css/showAddmodel.css";

const AddPersonModal = ({ onSave, onClose, existingEmployees }) => {
  const { formData, handleChange, handleSubmit } =
    useAddPersonLogic(existingEmployees, onSave, onClose);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>새 사람 추가</h3>
        <form onSubmit={handleSubmit}>
          {[
            ["사원번호", formData.employeeNumber, true],
            ["이름", formData.people, false, "text", "people"],
            ["주민등록번호", formData.maskedRsdnNmbr, false, "text", "rsdnNmbr"],
            ["전화번호", formData.phoneNumber, false, "text", "phoneNumber"],
            ["아이디", formData.id, false, "text", "id"],
            ["패스워드", formData.pw, false, "text", "pw"],
          ].map(([label, value, isTextOnly = false, type = "text", name = label], idx) => (
            <div className="form-row" key={idx}>
              <label>{label} :</label>
              {isTextOnly ? (
                <span>{value}</span>
              ) : (
                <input
                  name={name}
                  type={type}
                  value={value}
                  onChange={handleChange}
                  placeholder={label}
                />
              )}
            </div>
          ))}
          <button type="submit">저장</button>
          <button type="button" onClick={onClose}>취소</button>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;
