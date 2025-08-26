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
import { useAnimals } from "../context/AnimalsContext";



type LocationState = { animal?: Animal };

export const AnimalDetailsPage = () => {
  
  const { state } = useLocation() as { state?: LocationState };
  const animal = state?.animal;
  const {feed, canFeed, getStatus,getTimeUntilHungry} = useAnimals();
  
  if (!animal) return <Navigate to="/animals" replace />;

  // const isFed = canFeed(animal.id);
  const allowed = canFeed(animal.id);
  const status = getStatus(animal.id);
  const timeLeft = getTimeUntilHungry(animal.id);

  const statusClassName =
  status === "Mätt" ? "glow-green" :
  status === "Snart hungrig" ? "glow-yellow" :
  "glow-red";

  
  return (
    <section className="p-4 space-y-6">
        <div className="text-center flex">
        <Link to="/animals" className="underline">← Tillbaka</Link>
      </div>
      <h2>Animaldetails</h2>
      <AnimalHero animal={animal} statusGlow={statusClassName} className=" h-70 md:[&_img]:w-[280px] md:[&_img]:h-[280px] md:[&_h3]:w-[280px] md:[&_h3]:h-[50px] md:[&_h3]:bottom-[0px] " />
      <button className="px-4 py-2 rounded-2xl shadow hover:shadow-md active:scale-95 transition" onClick={()=>feed(animal.id)} disabled={!allowed}>Mata</button>
      {/* <p>Status: {getStatus(animal.id)}</p>
          {getStatus(animal.id) === "Snart hungrig" && (
            <span className="text-yellow-600">⚠ Djuret behöver snart matas</span>
          )}
      <p>Hungrig om {getTimeUntilHungry(animal.id)} sekunder</p>
            {getStatus(animal.id) === "Snart hungrig" && (
        <p>Hungrig om {getTimeUntilHungry(animal.id)} sekunder</p>
      )} */}
      <p>Status: {status}</p>

      {status === "Snart hungrig" && (
        <p>
          ⚠ Behövs matas om ({timeLeft} sekunder)
        </p>
      )}

      {status === "Mätt" && (
        <p>
          ⚠ Hungrig om ({timeLeft} sekunder)
        </p>
      )}
    </section>
  );
};
