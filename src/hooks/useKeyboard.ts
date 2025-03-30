import { useCallback, useEffect } from 'react';
import { ACTIONS } from '../constants/gameConstants';
import { useGameContext } from './useGameContext';

/**
 * Custom hook for handling physical keyboard events
 */
export const useKeyboard = () => {
  const { eventEmitter } = useGameContext();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;

      // Handle letter keys (A-Z)
      if (/^[A-Za-z]$/.test(key) && key.length === 1) {
        eventEmitter.emit(ACTIONS.ADD_CHAR, key.toUpperCase());
        event.preventDefault();
      }
      // Handle Enter key
      else if (key === 'Enter') {
        eventEmitter.emit(ACTIONS.ENTER);
        event.preventDefault();
      }
      // Handle Backspace key
      else if (key === 'Backspace') {
        eventEmitter.emit(ACTIONS.BACKSPACE);
        event.preventDefault();
      }
    },
    [eventEmitter]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return null;
};
