import { createContext } from 'react';
import type { LoadingContextProps } from '../../types/context.types';

export const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);