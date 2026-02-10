import type { Dispatch, SetStateAction } from 'react';

export type LoadingContextProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type UserContextProps = {
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
};

export type LoadingProviderProps = {
  children: React.ReactNode;
};

export type UserProviderProps = {
  children: React.ReactNode;
};

export type AuthContextType = {
  authenticated: boolean;
  setAuthenticated: Dispatch<React.SetStateAction<boolean>>;
};

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface Alert {
  id: string;
  message: string;
  type: AlertType;
}

export type AlertContextProps = {
  alerts: Alert[];
  addAlert: (message: string, type?: AlertType, timeout?: number) => void;
  removeAlert: (id: string) => void;
};