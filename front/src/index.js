import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/login-Front/login';
import Calendar from './calenderTest/calenderFront/calender';
import AdminPage from './adminpage/adminpage-Front/adminPage';
import AdminInformation from './adminpage/adminpage-Front/adminInformation';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ⬇️ 수정: UserProvider import
import { UserProvider } from "./login/js/userContext";

// 인증 체크 컴포넌트
import RequireAuth from "./requireauth";

const Root = () => {
  return (
    // ⬇️ 수정: UserProvider로 감싸기
    <UserProvider>
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
          <Route
            path="/adminpage"
            element={
              <RequireAuth>
                <AdminPage />
              </RequireAuth>
            }
          />
          <Route path="/admin-info" element={<AdminInformation />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

reportWebVitals();

