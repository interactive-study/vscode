import { useTabsContext } from './TabsContext';

const useCodeContext = () => {
  const context = useTabsContext();
  const { tabs, currentTabIndex, setTabs } = context;

  const code = tabs[currentTabIndex].code;
  const setCode = (code: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[currentTabIndex].code = code;
    setTabs(updatedTabs);
  };

  return { code, setCode };
};

export { useCodeContext };
