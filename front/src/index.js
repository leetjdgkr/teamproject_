import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/login';
import App from './App';
import Calendar from './calenderTest/calender';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/">
    <Routes>
      {/* <Route path="/" element={<App/>}></Route> */}
      <Route path="/" element={<Login />} />
      <Route path="/data" element={<Calendar />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();