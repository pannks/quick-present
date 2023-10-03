import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    // Get from local storage then
    // parse stored json or return initialValue
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    // State to store our value
    const [value, setValue] = useState<T>(initial);

    // Return a wrapped version of useState's setter function
    // that persists the new value to localStorage.
    const setStoredValue = (newValue: T | ((val: T) => T)) => {
        const valueToStore =
            newValue instanceof Function ? newValue(value) : newValue;
        setValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
    };

    return [value, setStoredValue] as const;
}

export default useLocalStorage;
