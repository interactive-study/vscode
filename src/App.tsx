import Sun from './components/Celestial/Sun';
import ResetButton from './components/Controllers/ResetButton';
import SwitchButton from './components/Controllers/SwitchButton';
import Editor from './components/Editor';
import Reflection from './components/Reflection';
import { TabsProvider } from './contexts/TabsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import styles from './styles/App.module.css';

function App() {
  return (
    <ThemeProvider>
      <TabsProvider>
        <div className={styles.container}>
          <Editor />
          <Reflection />
        </div>

        <div className={styles.controllers}>
          <SwitchButton />
          <ResetButton />
        </div>

        <div className={styles.celestial}>
          <Sun />
        </div>
      </TabsProvider>
    </ThemeProvider>
  );
}

export default App;
