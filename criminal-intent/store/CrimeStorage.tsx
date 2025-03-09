import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export type Crime = {
  id: string | null;
  title: string;
  details: string;
  timestamp: string;
  solved: boolean;
};

const CRIMES_KEY = 'CRIMES';

export const getCrimes = async (): Promise<Crime[]> => {
  const crimes = await AsyncStorage.getItem(CRIMES_KEY);
  return crimes ? JSON.parse(crimes) : [];
};

export const getCrime = async (id: string): Promise<Crime | undefined> => {
  const crimes = await getCrimes();
  return crimes.find((c) => c.id === id);
};

export const saveCrime = async (crime: Crime): Promise<void> => {

  // if crime has an id, update it
  if (crime.id !== null) {
    await updateCrime(crime);
    return;
  }

  const crimes = await getCrimes();
  const UUID = Crypto.randomUUID();
  crime.id = UUID;
  await AsyncStorage.setItem(CRIMES_KEY, JSON.stringify([...crimes, crime]));
};

export const updateCrime = async (crime: Crime): Promise<void> => {

  // if crime has no id, save it as new
  if (crime.id === null) {
    await saveCrime(crime);
    return;
  }

  const crimes = await getCrimes();
  await AsyncStorage.setItem(
    CRIMES_KEY,
    JSON.stringify(crimes.map((c) => (c.id === crime.id ? crime : c)))
  );
};

export const deleteCrime = async (id: string): Promise<void> => {
  const crimes = await getCrimes();
  await AsyncStorage.setItem(
    CRIMES_KEY,
    JSON.stringify(crimes.filter((c) => c.id !== id))
  );
};

export const clearCrimes = async (): Promise<void> => {
  await AsyncStorage.removeItem(CRIMES_KEY);
};