import styles from './styles/App.module.css';
import Editor from './components/Editor';
import Reflection from './components/Reflection';
import { CodeProvider } from './contexts/CodeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ResetButton from './components/Controllers/ResetButton';
import SwitchButton from './components/Controllers/SwitchButton';

function App() {
  return (
    <ThemeProvider>
      <CodeProvider>
        <div className={styles.container}>
          <Editor />
          <Reflection />
        </div>

        <div className={styles.controllers}>
          <SwitchButton />
          <ResetButton />
        </div>
      </CodeProvider>
    </ThemeProvider>
  );
}

export default App;
