import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Animal } from "../models/Animal"

export type AnimalsContextValue = {
    animals:Animal[];
    loading: boolean;
    error: string | null; 
    getAnimal: (id: string | number) => Animal | undefined;

    getHunger: (id: string | number) => number;
    getStatus: (id: string | number) => string;
    canFeed: (id: string | number) => boolean;
    feed: (id: string | number) => void;
    // resetFeedingState: () => void;
}

const AnimalsContext = createContext<AnimalsContextValue | null>(null);

export const useAnimals = () => {
    const ctx = useContext(AnimalsContext);
    if (!ctx) throw new Error("useAnimals måste användas inuti <AnimalsProvider>");
    return ctx;
}

const LOCALSTORAGE_KEY = 'animals-feeding'; 

type localState = {
    hungerById: Record<string,number>;
    fedById: Record<string,boolean>;
};

const DEFAULT_HUNGER = 1; 

const loadLocal = (): localState => {
    try {
        const raw = localStorage.getItem(LOCALSTORAGE_KEY);
        if (!raw) return {hungerById: {}, fedById: {}};
        const parsed = JSON.parse(raw);
        return {
            hungerById: parsed.hungerById ?? {},
            fedById: parsed.fedById ?? {},
        };
    } catch {
        return {hungerById: {}, fedById: {},};
    }
}
const saveLocal = (state: localState) => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
}

export const AnimalProvider = ({children} : {children: ReactNode}) => {

    const [animals, setAnimals] = useState<Animal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadAnimals = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    'https://animals.azurewebsites.net/api/animals',
                    {signal: controller.signal}
                );

                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const data: Animal[] = await res.json();
                    setAnimals(data);
            } catch (error: unknown) {
                if (error instanceof DOMException && error.name === 'AbortError') return;
                const msg = error instanceof Error? error.message: 'Okänt fel';
                setError(msg);
            } finally {
                setLoading(false);
            }
        };

        loadAnimals();
        return () => controller.abort();}, []);

        const [local,setLocal] = useState<localState>(() => loadLocal());

        useEffect (() => {saveLocal(local); }, [local]);

        const value = useMemo<AnimalsContextValue>(() =>{
            
        const getAnimal = (id: string | number) => 
            animals.find(a => String(a.id) === String(id));

        const getHunger = (id: string | number) => 
            local.hungerById[String(id)] ?? DEFAULT_HUNGER;

        const canFeed = (id: string | number) => !local.fedById[String(id)];

        const getStatus = (id: string | number) => 
            getHunger(id) === 0 ? 'Mätt' : 'Hungrig';

        const feed = (id: string | number) => {
            const key = String(id);

            if (local.fedById[key]) return;
            setLocal(prev => {
                const current = prev.hungerById[key] ?? DEFAULT_HUNGER;
                const next = Math.max(0, current - 1);
                return {
                    hungerById: {...prev.hungerById, [key] : next},
                    fedById: {...prev.fedById, [key] : true}
                };
            });
        };

        return {
            animals, loading, error, getAnimal, getHunger, getStatus, canFeed,
            feed };

        }, [animals, loading, error, local]);

        

            return <AnimalsContext.Provider value = {value}>{children}</AnimalsContext.Provider>
}