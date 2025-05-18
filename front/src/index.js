import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/login';
import Calendar from './calenderTest/calenderFront/calender';
import AdminPage from './adminpage/adminPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./login/js/userContext";
import RequireAuth from "./requireauth"; // 분리한 인증 컴포넌트 import

const Root = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
          <Route path = "/adminpage" element={<AdminPage/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

reportWebVitals();
