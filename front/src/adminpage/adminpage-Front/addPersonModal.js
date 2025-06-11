import React from "react";
import { useAddPersonLogic } from "../js/useAddPersonLogic"; // 경로 확인!
import "../css/showAddmodel.css";

const AddPersonModal = ({ onSave, onClose, existingEmployees }) => {
  const { formData, handleChange, handleSubmit } =
    useAddPersonLogic(existingEmployees, onSave, onClose);

  // 전화번호 + 통신사 포함한 fields 배열
  const fields = [
    { label: "사원번호", name: "employeeNumber", value: formData.employeeNumber, readOnly: true },
    { label: "이름", name: "people", value: formData.people, placeholder: "ex)홍길동", maxLength: 8 },
    { label: "주민등록번호", name: "rsdnNmbr", value: formData.maskedRsdnNmbr, placeholder: "ex)000000-0******" },
    { label: "전화번호", name: "phoneNumber" }, // 특수 렌더링
    { label: "ID", name: "id", value: formData.id, placeholder: "ex)hong123", maxLength: 12 },
    { label: "비밀번호", name: "pw", value: formData.pw, placeholder: "ex)1234", maxLength: 16 },
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>새 사람 추가</h3>
        <form onSubmit={handleSubmit}>
          {fields.map((field, idx) => {
            if (field.name === "phoneNumber") {
              // 전화번호 + 통신사 한 줄에 렌더링
              return (
                <div className="form-row flex-row" key={idx}>
                  <label>{field.label} :</label>
                  <select
                    name="carrier"
                    value={formData.carrier || ""}
                    onChange={handleChange}
                    className="carrier-select"
                  >
                    <option value="">통신사 선택</option>
                    <option value="SKT">SKT</option>
                    <option value="KT">KT</option>
                    <option value="LGU+">LG U+</option>
                    <option value="알뜰폰">알뜰폰</option>
                  </select>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="ex)010-1234-5678"
                    maxLength={13}
                  />
                </div>
              );
            } else {
              return (
                <div className="form-row" key={idx}>
                  <label>{field.label} :</label>
                  {field.readOnly ? (
                    <span>{field.value}</span>
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={field.value}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                    />
                  )}
                </div>
              );
            }
          })}

          <button type="submit">저장</button>
          <button type="button" onClick={onClose}>취소</button>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;
