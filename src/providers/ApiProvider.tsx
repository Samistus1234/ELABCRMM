import { FC, ReactNode } from 'react';
import api from '@/lib/api';

interface ApiContextType {
  api: typeof api;
}

const ApiContext = React.createContext<ApiContextType>({ api });

export const useApi = () => React.useContext(ApiContext);

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
