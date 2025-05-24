import React,{useState} from "react";
import "./admnsButon.css";

const AdminPanel = ({onClose}) =>{
    return(
        <div className="adminpanelBk">
          {/* 어두운 반투명 배경 */}
          <div className="modal-overlay" onClick={onClose} />

          {/* 모달 내용 */}
          <div className="modal-contents" >
            <h2>일급 수정창</h2>
            <div className="activeModal">
                <div>
                    <span>삼성 전자</span>
                    <input/>
                </div>
                <div>
                    <span>삼성 전자</span>
                    <input/>
                </div>
                <div>
                    <span>삼성 전자</span>
                    <input/>
                </div>
                <div>
                    <span>삼성 전자</span>
                    <input/>
                </div>
            </div>
            <div className="panelBtn">
                <button> 수정 </button>
                <button onClick={onClose}>닫기</button>
            </div>
          </div>
        </div>
    )
}
export default AdminPanel;