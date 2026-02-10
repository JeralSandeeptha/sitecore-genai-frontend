import React, { useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useAlert } from '../../hooks/useAlert';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useLoading } from '../../hooks/useLoading';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const { addAlert } = useAlert();
  const { setIsLoading } = useLoading();
  const { clearLocalStorageItem } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
  const userId = localStorage.getItem('user-id');

  if (userId) {
    setAuthenticated(true);
  } else {
    setAuthenticated(false);
    clearLocalStorageItem('user-id');
    setIsLoading(false);
  }
}, [navigate]);


  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};