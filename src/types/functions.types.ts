import type { Dispatch, SetStateAction } from "react";
import type { NavigateFunction } from "react-router-dom";

export type generateComponentOnVercelProps = {
    prompt: string;
    image: string;
};

export type registerUserProps = {
    email: string;
    password: string;
    navigate: NavigateFunction;
    isLoading: boolean;
    setIsLoading: Dispatch<React.SetStateAction<boolean>>;
};

export type updateUserProps = {
    fname: string;
    lname: string;
    bio: string;
    userId: string;
    navigate: NavigateFunction;
    isLoading: boolean;
    setIsLoading: Dispatch<React.SetStateAction<boolean>>;
    setSavedMessage: Dispatch<React.SetStateAction<string>>;
    setProfileData: Dispatch<React.SetStateAction<any>>;
};

export type updateUserPreferencesProps = {
    vo_api_key: string;
    newApiKey: string;
    userId: string;
    navigate: NavigateFunction;
    setIsLoading: Dispatch<React.SetStateAction<boolean>>;
    setShowApiKeyForm: Dispatch<React.SetStateAction<boolean>>;
    setSavedMessage: Dispatch<React.SetStateAction<string>>;
    setProfileData: Dispatch<React.SetStateAction<any>>;
    setApiKey: Dispatch<React.SetStateAction<string>>;
    setNewApiKey: Dispatch<React.SetStateAction<string>>;
};

export type getSingleUserProps = {
    userId: string;
    setIsLoading: Dispatch<React.SetStateAction<boolean>>;
};

export type loginUserProps = {
    email: string;
    password: string;
    navigate: NavigateFunction;
    isLoading: boolean;
    setIsLoading: Dispatch<React.SetStateAction<boolean>>;
    setAuthenticated: Dispatch<SetStateAction<boolean>>;
    setLocalStorageItem: (itemName: string, itemData: unknown) => void;
    setUser: Dispatch<SetStateAction<string>>;
};
