import { createContext, useContext, useState } from 'react';

const TAP1_INITIAL_CODE = `<room>
  <desk>
    <drawer>hair tie</drawer>
    <notebook>grocery list</notebook>
  </desk>
  <bed>
    <pillow>earphones</pillow>
    <underbed>dusty socks</underbed>
  </bed>
</room>`;

const TAP2_INITIAL_CODE = `<livingroom>
  <couch>
    <between>remote control</between>
    <wallet>
      <id>Henry James 990728-3819290</id>
    </wallet>
  </couch>
  <plant>
    <pot>empty</pot>
  </plant>
  <bookshelf>
    <book>poetry of forgetting</book>
  </bookshelf>
</livingroom>`;

const TAB3_INITIAL_CODE = `
<kitchen>
  <fridge>
    <door>expired milk</door>
  </fridge>
  <sink>forks and knives</sink>
  <cabinet>
    <shelf>cup noodles</shelf>
  </cabinet>
<me>
  <face>mustache</face>
  <crossbag>
    tie handkerchief
    <pouch>lipstick</pouch>
  </crossbag>
  <oldcoat>
    <leftpocket>flower</leftpocket>
  </oldcoat>
</me>
</kitchen>`;

const TAB4_INITIAL_CODE = `<bathroom>
  <mirror>fog</mirror>
  <sink>
    <soap>lavender</soap>
    <mug>toothbrush</mug>
  </sink>
  <cabinet>
    <behind>painkillers</behind>
  </cabinet>
</bathroom>`;

const INITIAL_TABS = [
  { code: TAP1_INITIAL_CODE },
  { code: TAP2_INITIAL_CODE },
  { code: TAB3_INITIAL_CODE },
  { code: TAB4_INITIAL_CODE },
];

type TabsContextType = {
  tabs: { code: string }[];
  setTabs: (tabs: { code: string }[]) => void;
  currentTabIndex: number;
  setCurrentTabIndex: (index: number) => void;
  resetTabs: () => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Cannot find TabsContext');
  }
  return context;
};

const TabsProvider = ({ children }: { children: React.ReactNode }) => {
  const [tabs, setTabs] = useState(INITIAL_TABS);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const resetTabs = () => {
    setTabs(INITIAL_TABS);
    setCurrentTabIndex(0);
  };

  return (
    <TabsContext.Provider
      value={{ tabs, setTabs, currentTabIndex, setCurrentTabIndex, resetTabs }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export { TabsProvider, useTabsContext };
