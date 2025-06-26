import React, { useState, useContext, useEffect, useRef } from "react";
import AdminInformation from "./adminInformation";
import AddPersonModal from "./addPersonModal";
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

  // --- 리사이저 관련 state 및 ref ---
  const [columnWidths, setColumnWidths] = useState({
    employee_number: 150,
    user_name: 150,
    resident_number: 150,
    address: 200,
    phone_number: 150,
  });

  const resizingCol = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const onMouseDown = (e, colKey) => {
    e.preventDefault();
    resizingCol.current = colKey;
    startX.current = e.clientX;
    startWidth.current = columnWidths[colKey];
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!resizingCol.current) return;
    const deltaX = e.clientX - startX.current;
    const newWidth = Math.max(startWidth.current + deltaX, 50);
    setColumnWidths((prev) => ({
      ...prev,
      [resizingCol.current]: newWidth,
    }));
  };

  const onMouseUp = () => {
    resizingCol.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
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
            <th style={{ width: 30 }}></th>

            <th style={{ width: columnWidths.employee_number, position: "relative" }}>
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
              <div onMouseDown={(e) => onMouseDown(e, "employee_number")} className="column-resizer" />
            </th>

            <th style={{ width: columnWidths.user_name, position: "relative" }}>
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
              <div onMouseDown={(e) => onMouseDown(e, "user_name")} className="column-resizer" />
            </th>

            <th style={{ width: columnWidths.resident_number, position: "relative" }}>
              주민등록번호
              <div onMouseDown={(e) => onMouseDown(e, "resident_number")} className="column-resizer" />
            </th>

            <th style={{ width: columnWidths.address, position: "relative" }}>
              주소
              <div onMouseDown={(e) => onMouseDown(e, "address")} className="column-resizer" />
            </th>

            <th style={{ width: columnWidths.phone_number, position: "relative" }}>
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
              <div onMouseDown={(e) => onMouseDown(e, "phone_number")} className="column-resizer" />
            </th>
          </tr>
        </thead>

        <tbody>
          {peopleData.map((item) => (
            <tr key={item.employee_number} onClick={() => handleRowClick(item)} style={{ cursor: "pointer" }}>
              <td style={{ width: 30 }} onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={!!checkedItems[item.employee_number]}
                  onChange={() => handleCheckboxChange(item.employee_number)}
                />
              </td>
              <td style={{ width: columnWidths.employee_number }}>{item.employee_number}</td>
              <td style={{ width: columnWidths.user_name }}>{item.user_name}</td>
              <td style={{ width: columnWidths.resident_number }}>{item.resident_number}</td>
              <td style={{ width: columnWidths.address }}>{item.address}</td>
              <td style={{ width: columnWidths.phone_number }}>{item.phone_number}</td>
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
