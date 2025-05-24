import React, { useState } from "react";
import "../adminpage/adminPage.css";
import AdminPanel from "./js/admnsButon";
import AdminInformation from "./adminInformation";

const AdminPage = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [peopleData, setPeopleData] = useState([
    { people: "김재선", birthday: "2000.10.02", phoneNumber: "010-4134-9069" },
    { people: "남진우", birthday: "2000.08.29", phoneNumber: "010-3954-7589" },
  ]);

  const peopleHeader = ["이름", "생년월일", "전화번호"];

  const handleRowClick = (person) => {
    setSelectedPerson(person);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  const handleSave = (updatedPerson) => {
    setPeopleData((prev) =>
      prev.map((item) =>
        item.people === updatedPerson.people ? updatedPerson : item
      )
    );
    setSelectedPerson(null);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {peopleHeader.map((item, idx) => (
              <th key={idx}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {peopleData.map((item, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }}
            >
              <td>{item.people}</td>
              <td>{item.birthday}</td>
              <td>{item.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 행 클릭 시 모달 */}
      {selectedPerson && (
        <AdminInformation
          person={selectedPerson}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminPage;
