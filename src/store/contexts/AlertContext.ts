import { createContext } from 'react';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface Alert {
  id: string;
  message: string;
  type: AlertType;
}

interface AlertContextProps {
  alerts: Alert[];
  addAlert: (message: string, type?: AlertType, timeout?: number) => void;
  removeAlert: (id: string) => void;
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);