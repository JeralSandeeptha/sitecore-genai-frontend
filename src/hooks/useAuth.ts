import AuthContext from '@/store/contexts/AuthContext';
import type { AuthContextType } from '@/types/context.types';
import { useContext } from 'react';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};