/**
 * A simple event emitter/listener for handling game actions
 */
export class GameEventEmitter {
  #listeners: Record<string, Array<(data?: unknown) => void>>;

  // Init the class
  constructor() {
    this.#listeners = {};
  }

  /**
   * Register a listener function to an action name
   * @param action - Action name
   * @param listener - Function to invoke upon action call
   */
  registerListener(action: string, listener: (data?: unknown) => void): void {
    if (!this.#listeners[action]) {
      this.#listeners[action] = [];
    }

    this.#listeners[action].push(listener);
  }

  /**
   * Remove all listeners for an action
   * @param action - The action to remove
   */
  removeListener(action: string): void {
    delete this.#listeners[action];
  }

  /**
   * Invoke all registered listeners of the giving action with the passed data
   * @param action - The action name
   * @param data - The data to pass to all registered listeners as parameter
   */
  emit(action: string, data?: unknown): void {
    if (!this.#listeners[action] || this.#listeners[action].length === 0) {
      throw new Error(`Can't emit an event. Event "${action}" doesn't exist.`);
    }

    for (const listener of this.#listeners[action]) {
      listener(data);
    }
  }
}
