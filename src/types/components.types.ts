import type { SetStateAction } from "react";
import type { NavigateFunction } from "react-router-dom";
import type { AlertType } from "./context.types";

type RegisterData = {
    email: string;
    password: string;
    confirmPassword: string;
}

type LoginData = {
    email: string;
    password: string;
}

export type RegisterFormProps = {
    navigate: NavigateFunction;
    showPassword: boolean;
    setShowPassword: React.Dispatch<SetStateAction<boolean>>;
    showConfirm: boolean;
    setShowConfirm: React.Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;
    formData: RegisterData;
    setFormData: React.Dispatch<SetStateAction<RegisterData>>;
    error: string;
    setError: React.Dispatch<SetStateAction<string>>;
};

export type LoginFormProps = {
    navigate: NavigateFunction;
    showPassword: boolean;
    setShowPassword: React.Dispatch<SetStateAction<boolean>>;
    showConfirm: boolean;
    setShowConfirm: React.Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;
    formData: LoginData;
    setFormData: React.Dispatch<SetStateAction<LoginData>>;
    error: string;
    setError: React.Dispatch<SetStateAction<string>>;
};

export type AlertProps = {
  id: string;
  title: string;
  message: string;
  type: AlertType;
};

export type ProtectedRouteProps = {
  children: React.ReactNode;
};

export type PublicRouteProps = {
  children: React.ReactNode;
};

export type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
};