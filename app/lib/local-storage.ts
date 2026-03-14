function logStorageError(contexto: string, error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.error(`[localStorage] ${contexto}`, error);
  }
}

export function obtenerLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (error) {
    logStorageError(`No se pudo leer la clave "${key}".`, error);
    return fallback;
  }
}

export function guardarLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logStorageError(`No se pudo guardar la clave "${key}".`, error);
  }
}