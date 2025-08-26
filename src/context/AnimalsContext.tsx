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

    getTimeUntilHungry: (id: string | number) => number;
    // resetFeedingState: () => void;
}

const AnimalsContext = createContext<AnimalsContextValue | null>(null);

export const useAnimals = () => {
    const ctx = useContext(AnimalsContext);
    if (!ctx) throw new Error("useAnimals måste användas inuti <AnimalsProvider>");
    return ctx;
}

const LOCALSTORAGE_KEY = 'animals-feeding'; 
// const HUNGER_WINDOW = 4 * 60 * 60 * 1000;
const HUNGER_WINDOW = 4 * 10 * 1000; // test
const SOON_HUNGRY = 3 * 10 * 1000;
const SOON_THRESHOLD = HUNGER_WINDOW - SOON_HUNGRY;

type localState = {
    fedAtById: Record<string, number>;
};

// const DEFAULT_HUNGER = 1; 

const loadLocal = (): localState => {
    try {
        const raw = localStorage.getItem(LOCALSTORAGE_KEY);
        if (!raw) return {fedAtById: {},};
        const parsed = JSON.parse(raw);
        return {
            fedAtById: parsed.fedAtById ?? {},
        };
    } catch {
        return {fedAtById: {}};
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

        const [now, setNow] = useState(() => Date.now());
        useEffect(() => {
            // const t = setInterval(() => setNow(Date.now()), 60_000); // 1 min
            const t = setInterval(() => setNow(Date.now()), 1000); // test
            return () => clearInterval(t);
        }, []);

        const value = useMemo<AnimalsContextValue>(() =>{
            
        const getAnimal = (id: string | number) => 
            animals.find(a => String(a.id) === String(id));

        const isHungry = (id: string | number) => {
            const fedAt = local.fedAtById[String(id)];
            if (!fedAt) return true;                 // aldrig matad => hungrig
            return now - fedAt >= HUNGER_WINDOW;  // 4h passerat => hungrig
          };

        // const getHunger = (id: string | number) => 
        //     local.hungerById[String(id)] ?? DEFAULT_HUNGER;

        // const canFeed = (id: string | number) => !local.fedById[String(id)];

        // const getStatus = (id: string | number) => 
        //     getHunger(id) === 0 ? 'Mätt' : 'Hungrig';

        const getHunger = (id: string | number) => (isHungry(id) ? 1 : 0);

        // const getStatus = (id: string | number) => (isHungry(id) ? "Hungrig" : "Mätt");

        const getStatus = (id: string | number) => {
            const fedAt = local.fedAtById[String(id)];
            if (!fedAt) return "Hungrig"; 
            
            const elapsed = now - fedAt;
          
            if (elapsed >= HUNGER_WINDOW) {
              return "Hungrig";
            } else if (elapsed >= SOON_THRESHOLD) {  // test - ska vara 3 * 60 * 60 * 1000
              return "Snart hungrig";
            } else {
              return "Mätt";
            }
          };

        const canFeed   = (id: string | number) => isHungry(id); // får mata när hungrig

        // const feed = (id: string | number) => {
        //     const key = String(id);

        //     if (local.fedById[key]) return;
        //     setLocal(prev => {
        //         const current = prev.hungerById[key] ?? DEFAULT_HUNGER;
        //         const next = Math.max(0, current - 1);
        //         return {
        //             hungerById: {...prev.hungerById, [key] : next},
        //             fedById: {...prev.fedById, [key] : true}
        //         };
        //     });
        // };

        const feed = (id: string | number) => {
            const key = String(id);
            setLocal(prev => ({
              fedAtById: { ...prev.fedAtById, [key]: Date.now() }
            }));
          };

          const getTimeUntilHungry = (id: string | number) => {
            const fedAt = local.fedAtById[String(id)];
            if (!fedAt) return 0; // aldrig matad => hungrig direkt
            const msLeft = HUNGER_WINDOW - (now - fedAt);
            return Math.max(0, Math.floor(msLeft / 1000)); // returnera sekunder kvar
          };
          

          return { animals, loading, error, getAnimal, getHunger, getStatus, canFeed, feed, getTimeUntilHungry };
        }, [animals, loading, error, local, now]);

        

            return <AnimalsContext.Provider value = {value}>{children}</AnimalsContext.Provider>
}