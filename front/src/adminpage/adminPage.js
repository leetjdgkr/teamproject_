import React, { useState } from "react";
import "../adminpage/adminPage.css";
import AdminPanel from "./js/admnsButon";  // 대문자 컴포넌트명으로 맞춰주세요

const AdminPage = () => {
  const [showModal, setShowModal] = useState(false);

  const people = {
    header: ["이름", "생년월일", "전화번호"],
    data: [
      { people: "김재선", birthday: "2000.10.02", phoneNumber: "010-4134-9069" },
      { people: "남진우", birthday: "2000.08.29", phoneNumber: "010-3954-7589" },
    ],
  };

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {people.header.map((item, idx) => (
              <th key={idx}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.data.map((item, index) => (
            <tr key={index}>
              <td>{item.people}</td>
              <td>{item.birthday}</td>
              <td>{item.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleClick}>일급</button>

      {showModal && <AdminPanel onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AdminPage;
