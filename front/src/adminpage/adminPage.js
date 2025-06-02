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
    { people: "김재선", birthday: "2000.10.02", phoneNumber: "010-4134-9069", company: "SEOSAN_001" },
    { people: "남진우", birthday: "2000.08.29", phoneNumber: "010-3954-7589", company: "SEOSAN_002" },
  ]);

  // 체크된 사원 관리 상태 (company를 key로)
  const [checkedItems, setCheckedItems] = useState({});

  const peopleHeader = [" ", "사원 번호", "이름", "생년월일", "전화번호"];

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

  const handleaddLow = () => {
    setShowAddModal(true);
  };

  const handleSaveNewPerson = (newPerson) => {
    setPeopleData((prev) => [...prev, newPerson]);
    setShowAddModal(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // 체크박스 토글 함수
  const handleCheckboxChange = (company) => {
    setCheckedItems((prev) => ({
      ...prev,
      [company]: !prev[company],
    }));
  };

  // 삭제 함수
  const handleDeleteSelected = () => {
    const remaining = peopleData.filter((person) => !checkedItems[person.company]);
    setPeopleData(remaining);
    setCheckedItems({});
  };

  return (
    <div className="adminPage_Bk">
      <div className="add-button-wrapper" style={{ marginBottom: "10px" }}>
        <AddButton onAdd={handleaddLow} />
        <button
          onClick={handleDeleteSelected}
          disabled={Object.values(checkedItems).every((checked) => !checked)}
          style={{ marginLeft: "10px" }}
        >
          선택 삭제
        </button>
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
              <td onClick={(e) => e.stopPropagation()}>
                {/* 클릭 시 모달이 뜨는걸 막기 위해 이벤트 버블링 막음 */}
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={!!checkedItems[item.company]}
                  //!! -> 값이 있으면 true 없으면 false 를 반환
                  onChange={() => handleCheckboxChange(item.company)}
                />
              </td>
              <td>{item.company}</td>
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
          existingEmployees={peopleData}
        />
      )}
    </div>
  );
};

export default AdminPage;
