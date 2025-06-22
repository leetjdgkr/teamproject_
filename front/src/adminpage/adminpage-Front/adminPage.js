import React, { useState, useContext, useEffect } from "react";
import AdminInformation from "./adminInformation";
import AddPersonModal from "./addPersonModal";  // 기존 추가 모달
import AddButton from "./adminAddBtn";
import UserContext from "../../login/js/userContext";
import { useFilteredData } from "../js/adminPageLogic";
import "../css/adminPage.css";

const AdminPage = () => {
  const { userData } = useContext(UserContext);

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [peopleData, setPeopleData] = useState([]);
  const [queryParams, setQueryParams] = useState({
    filters: {},
    sort: null,
  });
  const filteredDataFromServer = useFilteredData(queryParams);

  useEffect(() => {
    if (filteredDataFromServer && filteredDataFromServer.length > 0) {
      setPeopleData(filteredDataFromServer);
    }
  }, [filteredDataFromServer]);
  useEffect(() => {
    if (userData && userData.length > 0 && peopleData.length === 0) {
      setPeopleData(userData);
    }
  }, [userData, peopleData]);
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
  const handleFilterInput = (key, value) => {
    setQueryParams((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value,
      },
    }));
  };
  const handleSortChange = (key, direction) => {
    if (!direction) {
      setQueryParams((prev) => ({ ...prev, sort: null }));
      return;
    }
    setQueryParams((prev) => ({
      ...prev,
      sort: { key, direction },
    }));
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
            <th></th>
            <th>
              사원 번호
              <input
                type="text"
                placeholder="사원번호 검색"
                onChange={(e) => handleFilterInput("employee_number", e.target.value)}
              />
              <select onChange={(e) => handleSortChange("employee_number", e.target.value)}>
                <option value="">정렬 안함</option>
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
              </select>
            </th>
            <th>
              이름
              <input
                type="text"
                placeholder="이름 검색"
                onChange={(e) => handleFilterInput("user_name", e.target.value)}
              />
              <select onChange={(e) => handleSortChange("user_name", e.target.value)}>
                <option value="">정렬 안함</option>
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
              </select>
            </th>
            <th>주민등록번호</th>
            <th>주소</th>
            <th>
              전화번호
              <input
                type="text"
                placeholder="전화번호 검색"
                onChange={(e) => handleFilterInput("phone_number", e.target.value)}
              />
              <select onChange={(e) => handleSortChange("phone_number", e.target.value)}>
                <option value="">정렬 안함</option>
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
              </select>
            </th>
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
