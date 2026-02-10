import { LoadingContext } from '../contexts/LoadingContext';
import type { LoadingProviderProps } from '../../types/context.types';
import { useState } from 'react';

export const LoadingProvider = (props: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <LoadingContext.Provider value={{ isLoading: isLoading, setIsLoading: setIsLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};