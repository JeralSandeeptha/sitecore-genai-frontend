import { useState, type ReactNode } from 'react';
import type { Alert, AlertType } from '../../types/context.types';
import { AlertContext } from '../contexts/AlertContext';
import ReactDOM from 'react-dom';
import AlertComponent from '../../components/alert/Alert';

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (message: string, type: AlertType = 'info', timeout = 3000) => {
    const id = Date.now().toString();
    setAlerts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeAlert(id), timeout);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
      {ReactDOM.createPortal(
        <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50">
          {alerts.map((alert) => (
            <AlertComponent
              key={alert.id}
              id={alert.id}
              type={alert.type}
              title={alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
              message={alert.message}
            />
          ))}
        </div>,
        document.body
      )}
    </AlertContext.Provider>
  );
};