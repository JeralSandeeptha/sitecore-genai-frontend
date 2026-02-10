import type { UserContextProps } from '@/types/context.types';
import { createContext } from 'react';

export const UserContext = createContext<UserContextProps | undefined>(undefined);