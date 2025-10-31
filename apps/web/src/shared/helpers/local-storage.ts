type LocalStorageKey = string

export const LocalStorage = {
  set<T>(key: LocalStorageKey, value: T): void {
    const isObject = typeof value === 'object' && value !== null
    const storedValue = isObject ? JSON.stringify(value) : String(value)
    localStorage.setItem(key, storedValue)
  },

  get<T>(key: LocalStorageKey): T | null {
    const jsonValue = localStorage.getItem(key)
    try {
      return jsonValue ? (JSON.parse(jsonValue) as T) : null
    } catch {
      return jsonValue as unknown as T
    }
  },

  delete(key: LocalStorageKey): void {
    localStorage.removeItem(key)
  },
}
