import React, { useState } from "react";
import AdminPanel from "./js/admnsButon";
import AdminInformation from "./adminInformation";
import AddPersonModal from "./showAddmodel";
import AddButton from "./js/adminAddBtn";
import "../adminpage/adminPage.css";

const AdminPage = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
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
  const handleaddLow = () =>{
    setShowAddModal(true);
  }
  const handleSaveNewPerson = (newPerson) => {
    setPeopleData((prev) => [...prev, newPerson]);
    setShowAddModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="adminPage_Bk">
      <div className="add-button-wrapper">
        <AddButton onAdd={handleaddLow} />
      </div>
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
      {showAddModal && (
        <AddPersonModal
          onSave={handleSaveNewPerson}
          onClose={handleCloseAddModal}
        />
      )}
    </div>
  );
};

export default AdminPage;
