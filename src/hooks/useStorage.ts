import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorage = () => {
    return {
        set: <T,>(key: string, value: T) => {
            if (typeof value === "string") {
                AsyncStorage.setItem(key, value)
            }else{
                AsyncStorage.setItem(key, JSON.stringify(value))
            }
        },
        get: async <T,>(key: string) : Promise<T> => {
            return await AsyncStorage.getItem(key) as T
        },
        delete: async (key: string) => {
            await AsyncStorage.removeItem(key)
        }
    }
}

export default useStorage