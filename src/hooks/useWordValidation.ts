import { useCallback } from 'react';
import { dictionaryService } from '../services/DictionaryService';

/**
 * Custom hook for word validation logic
 */
export const useWordValidation = () => {
  /**
   * Validates if a word exists in the dictionary
   * @param word - The word to validate
   * @returns Promise resolving to whether the word is valid
   */
  const validateWord = useCallback(async (word: string): Promise<boolean> => {
    return await dictionaryService.checkWord(word);
  }, []);

  /**
   * Checks if a word has the required length
   * @param word - The word to check
   * @param requiredLength - The required length
   * @returns Whether the word has the required length
   */
  const hasRequiredLength = useCallback(
    (word: string[], requiredLength: number): boolean => {
      return word.length === requiredLength;
    },
    []
  );

  return {
    validateWord,
    hasRequiredLength,
  };
};
