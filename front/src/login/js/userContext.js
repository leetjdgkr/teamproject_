import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  employeeNumber: null,
  setEmployeeNumber: () => {},
  loading: true,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [employeeNumber, setEmployeeNumber] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("userRole");
    const savedName = sessionStorage.getItem("userName");
    const savedEmpNum = sessionStorage.getItem("employeeNumber");

    if (savedUser) {
      if (savedUser === "admin") {
        setUser("admin");
      } else if (savedUser === "user") {
        setUser(savedName);
        setEmployeeNumber(savedEmpNum);
      }
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, employeeNumber, setEmployeeNumber, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;



