import { FC, createContext, useContext, ReactNode } from 'react';
import api from '@/lib/api';

interface ApiContextType {
  api: typeof api;
}

const ApiContext = createContext<ApiContextType>({ api });

export const useApi = () => useContext(ApiContext);

interface ApiProviderProps {
  children: ReactNode;
}

const ApiProvider: FC<ApiProviderProps> = ({ children }) => {
  return (
    <ApiContext.Provider value={{ api }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;