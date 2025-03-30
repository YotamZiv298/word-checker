import { createContext } from 'react';
import type { GameEventEmitter } from '../services/ActionListener';

export type WordStatus = 'success' | 'error' | 'checking' | null;

export interface GameContextType {
  word: string[];
  status: WordStatus;
  eventEmitter: GameEventEmitter;
  wordLength: number;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
