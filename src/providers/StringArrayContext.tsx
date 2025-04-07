// StringArrayContext.tsx
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type StringArrayContextType = {
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
};

const StringArrayContext = createContext<StringArrayContextType | undefined>(undefined);

export const StringArrayProvider = ({ children }: { children: ReactNode }) => {
  const [values, setValues] = useState<string[]>([]);

  return (
    <StringArrayContext.Provider value={{ values, setValues }}>
      {children}
    </StringArrayContext.Provider>
  );
};

export const useStringArray = () => {
  const context = useContext(StringArrayContext);
  if (!context) {
    throw new Error('useStringArray must be used within a StringArrayProvider');
  }
  return context;
};
