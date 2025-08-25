// import { AnimalHero } from "../components/AnimalHero"

// export const AnimalDetailsPage = () => {
//     return (
//         <>
//             <h2>Animaldetails</h2>
//             <AnimalHero animal={animal}/>
//         </>
//     )
// }

// pages/AnimalDetailsPage.tsx
import { useLocation, Navigate, Link } from "react-router-dom";
import type { Animal } from "../models/Animal";
import { AnimalHero } from "../components/AnimalHero";

type LocationState = { animal?: Animal };

export const AnimalDetailsPage = () => {
  const { state } = useLocation() as { state?: LocationState };
  const animal = state?.animal;

  if (!animal) return <Navigate to="/animals" replace />;

  return (
    <section className="p-4 space-y-6">
        <div className="text-center flex">
        <Link to="/animals" className="underline">← Tillbaka</Link>
      </div>
      <h2>Animaldetails</h2>
      <AnimalHero animal={animal} className=" h-70 md:[&_img]:w-[280px] md:[&_img]:h-[280px] md:[&_h3]:w-[280px] md:[&_h3]:h-[50px] md:[&_h3]:bottom-[0px] " />
      
    </section>
  );
};
