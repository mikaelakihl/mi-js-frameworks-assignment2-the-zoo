import { useEffect, useState } from "react"
import type { Animal } from "../models/Animal"

export const Animals = () => {

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

        if (loading) return <p>Laddar djur...</p>;
        if (error) return <p>Fel: {error}</p>;


    return (
        <section className="p-4">

            <ul className="md:grid md:grid-cols-5 md:gap-y-2 md:gap-x-2">
                {animals.map((a) => (
                    <li key={a.id}>
                    <article className="flex flex-col items-center text-center relative h-64">
                        <img
                        src={a.imageUrl}
                        className="w-45 h-45 object-cover rounded-full border-7 border-yellow-950 "
                        />
                        <h3 className="mt-2 font-semibold bg-yellow-0 text-white p-2 absolute bottom-19 w-45 z-10 uppercase">{a.name}</h3>
                    </article>
                    </li>
      ))}
            </ul>
        </section>
    )
}