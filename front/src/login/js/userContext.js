import { createContext } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  employeeNumber: null,
  setEmployeeNumber: () => {},
});

export default UserContext;