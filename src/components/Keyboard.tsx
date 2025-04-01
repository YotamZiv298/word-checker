import { memo, useCallback } from 'react';
import { ACTIONS, KEYBOARD_LAYOUT } from '../constants/gameConstants';
import { useGameContext } from '../hooks/useGameContext';

export const Keyboard = memo(() => {
  const { eventEmitter } = useGameContext();

  const handleCharClick = useCallback(
    (char: string) => {
      try {
        eventEmitter.emit(ACTIONS.ADD_CHAR, char);
      } catch (error) {
        console.error('Error adding character:', error);
      }
    },
    [eventEmitter]
  );

  const handleBackspace = useCallback(() => {
    try {
      eventEmitter.emit(ACTIONS.BACKSPACE);
    } catch (error) {
      console.error('Error on backspace:', error);
    }
  }, [eventEmitter]);

  const handleEnter = useCallback(() => {
    try {
      eventEmitter.emit(ACTIONS.ENTER);
    } catch (error) {
      console.error('Error when pressing enter:', error);
    }
  }, [eventEmitter]);

  const getRowId = (index: number): string => `keyboard-row-${index}`;

  return (
    <div className="keyboard">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={getRowId(rowIndex)} className="keyboard-row">
          <div className="keyboard-row-inner">
            {rowIndex === 2 && (
              <button
                type="button"
                onClick={handleEnter}
                className="key key-enter"
              >
                ENTER
              </button>
            )}

            {row.map(char => (
              <button
                type="button"
                key={char}
                onClick={() => handleCharClick(char)}
                className="key"
              >
                {char}
              </button>
            ))}

            {rowIndex === 2 && (
              <button
                type="button"
                onClick={handleBackspace}
                className="key key-backspace"
              >
                ⌫
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});
