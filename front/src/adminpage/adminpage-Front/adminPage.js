import React, { useState, useContext, useEffect } from "react";
import AdminInformation from "./adminInformation";
import AddPersonModal from "./addPersonModal";  // 기존 추가 모달
import AddButton from "./adminAddBtn";
import UserContext from "../../login/js/userContext";
import "../css/adminPage.css";

const AdminPage = () => {
  const { userData } = useContext(UserContext);

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [peopleData, setPeopleData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    if (userData && userData.length > 0) {
      setPeopleData(userData);
    }
  }, [userData]);

  const peopleHeader = [" ", "사원 번호", "이름", "주민등록번호", "주소", "전화번호"];

  const handleRowClick = (person) => {
    setSelectedPerson(person);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
  };

  const handleSave = (updatedPerson) => {
    setPeopleData((prev) =>
      prev.map((item) =>
        item.employee_number === updatedPerson.employee_number ? updatedPerson : item
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

  const handleCheckboxChange = (employee_number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [employee_number]: !prev[employee_number],
    }));
  };

  const handleDeleteSelected = () => {
    const remaining = peopleData.filter((person) => !checkedItems[person.employee_number]);
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
          {peopleData.map((item) => (
            <tr
              key={item.employee_number}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }}
            >
              <td onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={!!checkedItems[item.employee_number]}
                  onChange={() => handleCheckboxChange(item.employee_number)}
                />
              </td>
              <td>{item.employee_number}</td>
              <td>{item.user_name}</td>
              <td>{item.resident_number}</td>
              <td>{item.address}</td>
              <td>{item.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
