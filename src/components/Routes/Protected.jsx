import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import useValidUser from '../../hooks/useValidUser';

function Protected({ children, access }) {
  const isValidUser = useValidUser();

  const { role } = useSelector((state) => state.user);

  if (!isValidUser) {
    return <Navigate to="/login" />;
  }

  if (access) {
    if (role.toLowerCase() !== access.toLowerCase()) {
      return <Navigate to="/" />;
    }
  }

  return children;
}

export default Protected;
