import { useState } from 'react';
import type { UserProviderProps } from '../../types/context.types';
import { UserContext } from '../contexts/UserContext';
import useLocalStorage from '../../hooks/useLocalStorage';

export const UserProvider = (props: UserProviderProps) => {
  const { getLocalStorageItem } = useLocalStorage();

  const [user, setUser] = useState<string>(() => {
    const storedUser = getLocalStorageItem('user-id');
    return storedUser ?? '';
  });
  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};