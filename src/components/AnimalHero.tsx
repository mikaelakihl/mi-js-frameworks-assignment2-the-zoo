import type { Animal } from "../models/Animal";

type Props = {
  animal: Pick<Animal, "name" | "imageUrl">;
  className?: string;
};

export const AnimalHero = ({ animal, className = "" }: Props) => {
  return (
    <article className={`flex flex-col items-center text-center relative h-64 ${className}`}>
      <img
        src={animal.imageUrl}
        alt={animal.name}
        className="w-[180px] h-[180px] object-cover rounded-full border-[7px] border-yellow-950"
        onError={(e) => { e.currentTarget.src = `https://placehold.co/180x180?text=${encodeURIComponent(animal.name)}`; }}
      />
      <h3 className="mt-2 font-semibold bg-yellow-950 text-white p-2 flex justify-center items-center absolute bottom-[76px] w-[180px] z-10 uppercase">
        {animal.name}
      </h3>
    </article>
  );
};
