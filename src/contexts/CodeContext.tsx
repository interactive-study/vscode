import { createContext, useContext, useState } from 'react';

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
  const [code, setCode] = useState(`<div>\n  Hello, World!\n</div>`);
  return (
    <CodeContext.Provider value={{ code, setCode }}>
      {children}
    </CodeContext.Provider>
  );
};

export { CodeProvider, useCodeContext };
