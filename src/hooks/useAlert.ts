import { useContext } from 'react';
import type { AlertContextProps } from '../types/context.types';
import { AlertContext } from '@/store/contexts/AlertContext';

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};