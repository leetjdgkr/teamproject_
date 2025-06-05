import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/login';
import Calendar from './calenderTest/calenderFront/calender';
import AdminPage from './adminpage/adminPage';
import AdminInformation from './adminpage/adminInformation'; // ✅ 새로 추가
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./login/js/userContext";
import RequireAuth from "./requireauth"; // 분리한 인증 컴포넌트 import

const Root = () => {
  const [user, setUser] = useState(null);
  const [employeeNumber, setEmployeeNumber] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, employeeNumber, setEmployeeNumber }}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/data"
            element={
              <RequireAuth>
                <Calendar />
              </RequireAuth>
            }
          />
          <Route path="/adminpage" element={<RequireAuth><AdminPage /></RequireAuth>} />
          <Route path="/admin-info" element={<AdminInformation />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

reportWebVitals();

