import React, { useState } from "react";
import "../adminpage/adminPage.css";
import AdminInformation from "./adminInformation";

const AdminPage = () => {
    const [peopleData, setPeopleData] = useState([
        { people: "김재선", birthday: "2000.10.02", phoneNumber: "010-4134-9069" },
        { people: "남진우", birthday: "2000.08.29", phoneNumber: "010-3954-7589" },
    ]);
    const [selectedPerson, setSelectedPerson] = useState(null);

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
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>생년월일</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody>
                    {peopleData.map((item, index) => (
                        <tr key={index} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                            <td>{item.people}</td>
                            <td>{item.birthday}</td>
                            <td>{item.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 모달 조건부 렌더링 */}
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
