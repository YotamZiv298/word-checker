import { useKeyboard } from '../hooks/useKeyboard';
import { Keyboard } from './Keyboard';
import { WordDisplay } from './WordDisplay';

export const WordGame = () => {
  useKeyboard();

  return (
    <div className="game-container">
      <div className="word-slots-container">
        <WordDisplay />
      </div>
      <Keyboard />
    </div>
  );
};
