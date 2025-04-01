import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ACTIONS, DEFAULT_WORD_LENGTH, STATUS_RESET_DELAY } from '../constants';
import { useWordValidation } from '../hooks/useWordValidation';
import { GameEventEmitter } from '../services/ActionListener';
import { GameContext, type WordStatus } from './GameContextValue';

interface GameProviderProps {
  children: ReactNode;
  wordLength?: number;
}

export const GameProvider = ({
  children,
  wordLength = DEFAULT_WORD_LENGTH,
}: GameProviderProps) => {
  const [word, setWord] = useState<string[]>([]);
  const [status, setStatus] = useState<WordStatus>(null);
  const [eventEmitter] = useState(() => new GameEventEmitter());

  const { validateWord, hasRequiredLength } = useWordValidation();

  const handleAddChar = useCallback(
    (data?: unknown) => {
      const char = data as string;
      setWord(prevWord => {
        if (prevWord.length < wordLength) {
          return [...prevWord, char];
        }
        return prevWord;
      });
    },
    [wordLength]
  );

  const handleBackspace = useCallback(() => {
    setWord(prevWord => {
      if (prevWord.length > 0) {
        return prevWord.slice(0, -1);
      }
      return prevWord;
    });
  }, []);

  const resetStatusAfterDelay = useCallback((isValid: boolean) => {
    setTimeout(() => {
      setStatus(null);
      if (isValid) {
        setWord([]);
      }
    }, STATUS_RESET_DELAY);
  }, []);

  const handleEnter = useCallback(async () => {
    if (!hasRequiredLength(word, wordLength)) {
      return;
    }

    const currentWord = word.join('').toLowerCase();
    try {
      setStatus('checking');

      const isValid = await validateWord(currentWord);
      setStatus(isValid ? 'success' : 'error');

      resetStatusAfterDelay(isValid);
    } catch (error) {
      console.error('Error checking word:', error);
      setStatus('error');
      resetStatusAfterDelay(false);
    }
  }, [
    word,
    wordLength,
    validateWord,
    hasRequiredLength,
    resetStatusAfterDelay,
  ]);

  useEffect(() => {
    eventEmitter.registerListener(ACTIONS.ADD_CHAR, handleAddChar);
    eventEmitter.registerListener(ACTIONS.BACKSPACE, handleBackspace);
    eventEmitter.registerListener(ACTIONS.ENTER, handleEnter);

    return () => {
      eventEmitter.removeListener(ACTIONS.ADD_CHAR);
      eventEmitter.removeListener(ACTIONS.BACKSPACE);
      eventEmitter.removeListener(ACTIONS.ENTER);
    };
  }, [eventEmitter, handleAddChar, handleBackspace, handleEnter]);

  const value = useMemo(
    () => ({
      word,
      status,
      eventEmitter,
      wordLength,
    }),
    [word, status, eventEmitter, wordLength]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
