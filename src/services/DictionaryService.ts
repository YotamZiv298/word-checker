/**
 * Service for checking words against an English dictionary
 */
export class DictionaryService {
  private apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  /**
   * Check if a word exists in the English dictionary
   * @param word - The word to validate
   * @returns Promise resolving to true if word exists, false otherwise
   */
  async checkWord(word: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}${word.toLowerCase()}`);
      return response.ok;
    } catch (error) {
      console.error('Error checking dictionary:', error);
      return false;
    }
  }
}

export const dictionaryService = new DictionaryService();
