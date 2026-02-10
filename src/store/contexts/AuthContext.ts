import { createContext } from 'react';
import type { AuthContextType } from '../../types/context.types';

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;