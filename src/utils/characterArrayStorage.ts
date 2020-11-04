import AsyncStorage from '@react-native-async-storage/async-storage';

const key: string = "characterListKey";

/**
 * @returns Promise that resolves to an array of Characters. Resolve to empty array is none exists.
 */
export function retrieveStoredCharacters(): Promise<Array<any>> {
    return AsyncStorage.getItem(key).then(res => res? JSON.parse(res) : [])
}

export function storeCharacterArray(characters: Array<any>): Promise<any> {
    return AsyncStorage.setItem(key, JSON.stringify(characters));
}