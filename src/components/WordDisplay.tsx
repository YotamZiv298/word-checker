import { memo, useCallback, useMemo } from 'react';
import { useGameContext } from '../hooks/useGameContext';

export const WordDisplay = memo(() => {
  const { word, status, wordLength } = useGameContext();

  const slots = useMemo(() => Array(wordLength).fill(null), [wordLength]);

  const getSlotClass = useCallback((status: string | null): string => {
    const baseClass = 'letter-slot';

    if (!status) return baseClass;

    return `${baseClass} slot-${status}`;
  }, []);

  const getSlotKey = useCallback(
    (index: number): string => {
      const content = word[index] || '_empty_';
      return `letter-slot-${index}-${content}`;
    },
    [word]
  );

  return (
    <div className="word-slots">
      {slots.map((_, index) => (
        <div key={getSlotKey(index)} className={getSlotClass(status)}>
          {word[index] || ''}
        </div>
      ))}
    </div>
  );
});
