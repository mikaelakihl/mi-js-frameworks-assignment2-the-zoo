import { useState } from "react";

export const FeedAnimal = () => {
  // 1) Hårdkodat djur (ingen backend, bara ett objekt i koden)
  const animal = { name: "Katten Misse" };

  // 2) Tillstånd (state) för hunger: 0 = mätt, 5 = superhungrig
  const [hunger, setHunger] = useState(1);
  const [fed,setFed] = useState(false);

  // 3) När vi klickar på knappen minskar vi hungern med 1 (men inte under 0)
  const feed = () => {
    if (fed) return;
    setFed(true);
    setHunger (h => Math.max(0,h-1));
  }

  // 4) En enkel text för status
  const status =
    hunger === 0 ? "Mätt" : hunger >= 2 ? "hungrig" : "hungrig";


  return (
    
      <div>
        <h1 className="text-2xl font-bold">Mata ett hårdkodat djur</h1>
        <p className="text-sm text-gray-600 mb-4">Djur: <span className="font-medium">{animal.name}</span></p>

        <p className="mb-2"><span className="italic">{status}</span></p>

        <button
          onClick={feed}
          className="px-4 py-2 rounded-2xl shadow hover:shadow-md active:scale-95 transition"
        >
          Mata {animal.name}
        </button>
      </div>
  );
}
