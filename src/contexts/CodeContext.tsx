import { createContext, useContext, useState } from 'react';

export const INITIAL_CODE = `<div>\n  Empty thoughts...\n</div>`;

type CodeContextType = {
  code: string;
  setCode: (code: string) => void;
};

const CodeContext = createContext<CodeContextType | null>(null);

const useCodeContext = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('Cannot find CodeContext');
  }
  return context;
};

const CodeProvider = ({ children }: { children: React.ReactNode }) => {
  const [code, setCode] = useState(INITIAL_CODE);
  return (
    <CodeContext.Provider value={{ code, setCode }}>
      {children}
    </CodeContext.Provider>
  );
};

export { CodeProvider, useCodeContext };
