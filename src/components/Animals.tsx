import { Link } from "react-router-dom";
import { AnimalHero } from "./AnimalHero";
import { useAnimals } from "../context/AnimalsContext";

export const Animals = () => {

    const {animals, loading, error, needsFoodSoon, isOverdue, getStatus, getStatusClass} = useAnimals();

    // const [animals, setAnimals] = useState<Animal[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string|null>(null);

    // useEffect(() => {
    //     const controller = new AbortController();

    //     const loadAnimals = async () => {
    //         try {
    //             setLoading(true);
    //             setError(null);

    //             const res = await fetch(
    //                 'https://animals.azurewebsites.net/api/animals',
    //                 {signal: controller.signal}
    //             );

    //             if (!res.ok) throw new Error(`HTTP ${res.status}`);
    //                 const data: Animal[] = await res.json();
    //                 setAnimals(data);
    //         } catch (error: unknown) {
    //             if (error instanceof DOMException && error.name === 'AbortError') return;
    //             const msg = error instanceof Error? error.message: 'Okänt fel';
    //             setError(msg);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadAnimals();
    //     return () => controller.abort();}, []);

        if (loading) return <p>Laddar djur...</p>;
        if (error) return <p>Fel: {error}</p>;


    return (

    // <section className="p-4">

    //         <ul className="md:grid md:grid-cols-5 md:gap-y-2 md:gap-x-2">
    //             {animals.map((a) => (
    //                 <li key={a.id}>
    //                     <Link to={`/animals/${a.id}`} state={{ animal: a }} className="block">
    //                         <AnimalHero animal={a}/>
    //                 </Link>
    //                 </li>
    //   ))}
    //         </ul>
    //     </section>

    <section className="p-4">
      <ul className="md:grid md:grid-cols-5 md:gap-y-2 md:gap-x-2">
        {animals.map((a) => {
            const status = getStatus(a.id);
            const glow = getStatusClass(a.id);

            // const glow = status === 'Mätt' ? 'glow-green' :
            // status === 'Snart hungrig' ? 'glow-yellow' : 'glow-red';

          const soon = needsFoodSoon?.(a.id) // 3h–4h
          const late = isOverdue?.(a.id)    // 5h+
          
          

          return (
            <li key={a.id}>
              <Link to={`/animals/${a.id}`} state={{ animal: a }} className="block">
                <AnimalHero animal={a} statusGlow={glow}>
                {/* <div>
                <span>Status:</span> {status}
              </div> */}
                {late ? (
                <div className="bg-yellow-100 border-1 text-xs text-red-500 p-2 ">
                  ⚠ Det har gått (5h) sedan djuret fick mat
                </div>
              ) : soon ? (
                <div className="bg-yellow-100 border-1 text-xs text-red-500 p-2">
                 ⚠ Behöver matas om (3h)
                </div>
              ) : null}
              
             
                </AnimalHero>
               
              </Link>

              {/* Statusrad under kortet */}
             
            </li>
          );
        })}
      </ul>
    </section>
    )
}