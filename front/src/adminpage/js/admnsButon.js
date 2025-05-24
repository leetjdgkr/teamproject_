import React,{useState} from "react";
import "./admnsButon.css";

const AdminPanel = ({onClose}) =>{
    return(
        <div>
          {/* 어두운 반투명 배경 */}
          <div className="modal-overlay" onClick={onClose} />

          {/* 모달 내용 */}
          <div className="modal-content" >
            <h2>일급 수정창</h2>
            <p>여기에 일급 수정 UI를 넣으시면 됩니다.</p>
            <button onClick={onClose}>닫기</button>
          </div>
        </div>
    )
}
export default AdminPanel;