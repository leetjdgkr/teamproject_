import React, { useState, useEffect } from "react";
import AdminPanel from "./js/admnsButon";
import locationsList from "../calenderTest/js/locationsList";
import './adminInformation.css'

const AdminInformation = ({ person, onClose, onSave }) => {
    const [formData, setFormData] = useState(person);
    const [showPanel, setShowPanel] = useState(false);

    useEffect(() => {
        setFormData(person); // 모달 열릴 때 초기값 반영
    }, [person]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };
    const handleShowPanel = () => {
        setShowPanel(true);
    };
    const handleBackFromPanel = () => {
        setShowPanel(false);
    };

    if (showPanel) {
        return (
            <div className="modal-backdrop">
                <div className="modal-content">
                    <AdminPanel onClose={handleBackFromPanel} locations = {locationsList} />
                </div>
            </div>
        );
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>정보 수정</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>이름: </label>
                        <span>{formData.people}</span>
                    </div>
                    <div>
                        <label>생년월일: </label>
                        <span>{formData.birthday}</span>
                    </div>
                    <div>
                        <label>전화번호: </label>
                        <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>
                    <button type="submit">저장</button>
                    <button type="button" className="closeBtn" onClick={onClose}>X</button>
                    <button onClick={handleShowPanel} >일급</button>
                </form>
            </div>
        </div>
    );
};

export default AdminInformation;


