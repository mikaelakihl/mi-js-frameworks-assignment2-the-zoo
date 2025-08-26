// import { createContext, useEffect, useReducer } from "react";

// const STORAGE_KEY = 'feeding-v1';

// export const load = (): FeedingState => {
//     try {
//         const raw = localStorage.getItem(STORAGE_KEY);
//         return raw ? JSON.parse(raw): {};
//     } catch {
//         return {};
//     }
// };

// const save = (state: FeedingState): void =>{
//     try {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
//     } catch {}
// };

// type Ctx = { state: FeedingState; dispatch: React.Dispatch<Action>};
// const FeedingContext = createContext<Ctx | null>(null);

// export const FeedingProvider = ({ children }: {children: React.ReactNode}) => {
//     const [state, dispatch] = useReducer(feedingReducer, {}, load);
// }

// useEffect(()=> { save(state); }, [state]);
