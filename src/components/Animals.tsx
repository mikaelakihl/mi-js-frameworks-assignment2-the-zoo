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
        <>
            {animals.map(a => (
                <ul key={a.id}>
                    <li>
                        <article>
                            <h2>{a.name}</h2>
                            <div>
                                <img className="object-contain" src={a.imageUrl}/>
                            </div>
                        </article>
                    </li>

                </ul>
            ))}
        </>
    )
}