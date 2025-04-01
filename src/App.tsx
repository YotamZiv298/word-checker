import './App.css';
import { WordGame } from './components/WordGame';
import { DEFAULT_WORD_LENGTH } from './constants';
import { GameProvider } from './context/GameContext';

const App = () => {
  return (
    <GameProvider wordLength={DEFAULT_WORD_LENGTH}>
      <div className="app-container">
        <h1 className="app-title">Word Checker</h1>
        <WordGame />
      </div>
    </GameProvider>
  );
};

export default App;
