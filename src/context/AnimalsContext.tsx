import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Animal } from "../models/Animal";

export type AnimalsContextValue = {
  animals: Animal[];
  loading: boolean;
  error: string | null;
  getAnimal: (id: string | number) => Animal | undefined;
  getStatus: (id: string | number) => string;
  canFeed: (id: string | number) => boolean;
  feed: (id: string | number) => void;
  getTimeUntilHungry: (id: string | number) => number;
  needsFoodSoon: (id: string | number) => boolean;
  isOverdue: (id: string | number) => boolean;
  getStatusClass: (id: string | number) => string;
};

const AnimalsContext = createContext<AnimalsContextValue | null>(null);

export const useAnimals = () => {
  const ctx = useContext(AnimalsContext);
  if (!ctx)
    throw new Error("useAnimals måste användas inuti <AnimalsProvider>");
  return ctx;
};

const LOCALSTORAGE_KEY = "animals-feeding";
const HOUR = 60 * 60 * 1000;

const WARN_AT = 3 * HOUR; // 30 s 3h
const HUNGRY_AT = 4 * HOUR; // 40 s 4h
const OVERDUE = 5 * HOUR; // 5 h

type localState = {
  fedAtById: Record<string, number>;
};

const loadLocal = (): localState => {
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!raw) return { fedAtById: {} };
    const parsed = JSON.parse(raw);
    return {
      fedAtById: parsed.fedAtById ?? {},
    };
  } catch {
    return { fedAtById: {} };
  }
};
const saveLocal = (state: localState) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
};

export const AnimalProvider = ({ children }: { children: ReactNode }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadAnimals = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://animals.azurewebsites.net/api/animals",
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Animal[] = await res.json();
        setAnimals(data);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        const msg = error instanceof Error ? error.message : "Okänt fel";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    loadAnimals();
    return () => controller.abort();
  }, []);

  const [local, setLocal] = useState<localState>(() => loadLocal());

  useEffect(() => {
    saveLocal(local);
  }, [local]);

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000); // 1 min
    // const t = setInterval(() => setNow(Date.now()), 1000); // test
    return () => clearInterval(t);
  }, []);

  const value = useMemo<AnimalsContextValue>(() => {
    const getAnimal = (id: string | number) =>
      animals.find((a) => String(a.id) === String(id));

    const getElapsed = (id: string | number) => {
      const key = String(id);

      // Lokalt värde (om du matat i den här browsern)
      const localFed = local.fedAtById[key];

      // API-värde (lastFed i ISO-format) – om lokalt saknas
      const animal = animals.find((a) => String(a.id) === key);
      const apiFedMs = animal?.lastFed ? Date.parse(animal.lastFed) : NaN;

      const fedAt =
        localFed ?? (!Number.isNaN(apiFedMs) ? apiFedMs : undefined);

      if (fedAt == null) return 0; // aldrig matad -> behandla som 0 ms
      return now - fedAt; // ms sedan senaste matning
    };

    const canFeed = (id: string | number) => getElapsed(id) >= HUNGRY_AT;

    const getStatus = (id: string | number) => {
      const elapsed = getElapsed(id);
      if (elapsed >= OVERDUE) return "Hungrig";
      if (elapsed >= HUNGRY_AT) return "Hungrig";
      if (elapsed >= WARN_AT) return "Snart hungrig";
      return "Mätt";
    };

    const getStatusClass = (id: string | number) => {
      const s = getStatus(id);
      if (s === "Mätt") return "glow-green";
      if (s === "Snart hungrig") return "glow-yellow";
      return "glow-red";
    };

    const feed = (id: string | number) => {
      const key = String(id);
      setLocal((prev) => ({
        fedAtById: { ...prev.fedAtById, [key]: Date.now() },
      }));
    };

    const getTimeUntilHungry = (id: string | number) => {
      const fedAt = local.fedAtById[String(id)];
      if (!fedAt) return 0; // aldrig matad => hungrig direkt
      const msLeft = HUNGRY_AT - (now - fedAt);
      return Math.max(0, Math.floor(msLeft / 1000)); // returnera sekunder kvar
    };

    const needsFoodSoon = (id: string | number) => {
      const e = getElapsed(id);
      return e >= WARN_AT && e < HUNGRY_AT; // 3h–4h
    };

    const isOverdue = (id: string | number) => getElapsed(id) >= OVERDUE;

    return {
      animals,
      loading,
      error,
      getAnimal,
      getStatus,
      canFeed,
      feed,
      getTimeUntilHungry,
      needsFoodSoon,
      isOverdue,
      getStatusClass,
    };
  }, [animals, loading, error, local, now]);

  return (
    <AnimalsContext.Provider value={value}>{children}</AnimalsContext.Provider>
  );
};
