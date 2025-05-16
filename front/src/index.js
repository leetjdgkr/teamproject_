import React,{ useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './login/login';
import App from './App';
import Calendar from './calenderTest/calenderFront/calender';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./login/js/userContext";

const Root = () =>{
  const [user, setUser] = useState(null);

  return(
    <UserContext.Provider value={{user,setUser}}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/data" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

reportWebVitals();