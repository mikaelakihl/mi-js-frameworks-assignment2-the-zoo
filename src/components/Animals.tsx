import { Link } from "react-router-dom";
import { AnimalHero } from "./AnimalHero";
import { useAnimals } from "../context/AnimalsContext";

export const Animals = () => {

    const {animals, loading, error, needsFoodSoon, isOverdue, getStatusClass} = useAnimals();


        if (loading) return <p>Laddar djur...</p>;
        if (error) return <p>Fel: {error}</p>;


    return (

    <section className="p-4">
      <ul className="md:grid md:grid-cols-5 md:gap-y-2 md:gap-x-2">
        {animals.map((a) => {

          const glow = getStatusClass(a.id);
          const soon = needsFoodSoon?.(a.id) // 3h–4h
          const late = isOverdue?.(a.id)    // 5h+
          
          return (
            <li key={a.id}>
              <Link to={`/animals/${a.id}`} state={{ animal: a }} className="block">
                <AnimalHero animal={a} statusGlow={glow}>
                {late ? (
                <div className="bg-yellow-100 border-1 text-xs text-red-500 p-2 ">
                  ⚠ Det har gått (5h) sedan {a.name} fick mat
                </div>
              ) : soon ? (
                <div className="bg-yellow-100 border-1 text-xs text-red-500 p-2">
                 ⚠ Behöver matas om (3h)
                </div>
              ) : null}
                </AnimalHero>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
    )
}