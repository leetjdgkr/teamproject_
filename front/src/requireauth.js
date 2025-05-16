import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './login/js/userContext'; // ✅ 경로 수정

const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RequireAuth;
