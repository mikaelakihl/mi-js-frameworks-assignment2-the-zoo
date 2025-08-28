import type { ReactNode } from "react";
import type { Animal } from "../models/Animal";

type Props = {
  animal: Pick<Animal, "name" | "imageUrl" | "longDescription" | "shortDescription">;
  className?: string;
  statusGlow?: string;
  children?: ReactNode;
  showLongDescription?: boolean;
};



export const AnimalHero = ({ animal, className = "", statusGlow = "", children, showLongDescription = false }: Props) => {
  const isLong = showLongDescription;
  const text = isLong ? animal.longDescription : animal.shortDescription;

  return (
    <article className='flex flex-col items-center text-center relative min-h-[400px]'>
      <div className="relative mt-2">
      <img
        src={animal.imageUrl}
        alt={animal.name}
        className='w-[180px] h-[180px] object-cover rounded-full border-[7px] border-yellow-950'
        onError={(e) => { e.currentTarget.src = `https://placehold.co/180x180?text=${encodeURIComponent(animal.name)}`; }}
      />
      <h3 className=" absolute bottom-0 left-1/2 -translate-x-1/2 px-3 py-1 w-[180px] h-[35px] rounded bg-yellow-950 text-white uppercase font-semibold z-10">
        {animal.name} 
      </h3>
      </div>

      <div className={isLong ? "mt-3 w-full px-4" : "mt-3 w-full h-[60px] flex items-center justify-center px-2"}>
        <p
          className={
            isLong
              ? "text-xs md:text-sm leading-relaxed break-words whitespace-pre-line max-w-prose mx-auto"
              : "text-xs leading-snug overflow-hidden text-ellipsis"
          }
        >
          {text}
        </p>
      </div>

      {/* <div className="mt-3 w-full h-[60px] flex items-center justify-center px-2">
      <p className="text-xs leading-snug overflow-hidden text-ellipsis">{text} </p>
      </div> */}

      <div className="mt-auto w-full flex flex-col items-center gap-6 pb-3">
      <div className={`h-5 w-5  rounded-full mt-5 ${statusGlow}`}></div>
      <div className="h-[40px] flex items-center">{children}</div>
      </div>
    
      
    </article>
  );
};