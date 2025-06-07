// src/adminpage/js/useAddPersonLogic.js
import { useEffect, useState } from "react";
import { Panel_PostData } from "./admnsdbPost";

export function useAddPersonLogic(existingEmployees, onSave, onClose) {
  const [formData, setFormData] = useState({
    employeeNumber: "",
    people: "",
    rsdnNmbr: "",
    maskedRsdnNmbr: "",
    phoneNumber: "",
    id: "",
    pw: 1234,
  });

  const generateEmployeeNumber = () => {
    const prefix = "SEOSAN";
    const numbers = existingEmployees
      .map((e) => parseInt(e.company?.split("_")[1]))
      .filter((n) => !isNaN(n));
    const last = numbers.length > 0 ? Math.max(...numbers) : 0;
    return `${prefix}_${String(last + 1).padStart(3, "0")}`;
  };

  useEffect(() => {
    if (existingEmployees && existingEmployees.length >= 0) {
      const newNumber = generateEmployeeNumber();
      setFormData((prev) => ({ ...prev, employeeNumber: newNumber }));
    }
  }, [existingEmployees]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rsdnNmbr") {
      const clean = value.replace(/[^0-9]/g, "").slice(0, 13);
      let formatted = clean;
      if (clean.length > 6) {
        formatted = clean.slice(0, 6) + "-" + clean.slice(6);
      }

      setFormData((prev) => ({
        ...prev,
        rsdnNmbr: formatted,
        maskedRsdnNmbr: formatted,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { people, rsdnNmbr, phoneNumber, employeeNumber, id, pw } = formData;

    if (!people || !rsdnNmbr || !phoneNumber) {
      alert("모든 필드를 입력하세요");
      return;
    }

    const fullData = {
      people,
      rsdnNmbr,
      phoneNumber,
      company: employeeNumber,
      id,
      pw,
    };

    onSave(fullData);

    const panel_post_data = {
      data_type: "user_login_info",
      data: {
        employee_number: employeeNumber,
        user_name: people,
        user_id: id,
        password: pw,
        phone_number: phoneNumber,
        resident_number: rsdnNmbr,
      },
    };

    try {
      const result = await Panel_PostData(panel_post_data);
      console.log("전송 성공", result);
      onClose();
    } catch (err) {
      console.error(err);
      alert("데이터 전송 실패");
    }
  };

  return { formData, handleChange, handleSubmit };
}
