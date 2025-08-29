import { Link } from "react-router";
import { AnimalHero } from "../components/AnimalHero";
import { useAnimals } from "../context/AnimalsContext"

export const HomePage = () => {

    const {animals, getStatus, loading, error} = useAnimals();

    if (loading) return <p>Laddar... </p>
    if (error) return <p>Fel: {error}</p>

    const hungryAnimals = animals.filter(a => getStatus(a.id) === 'Hungrig');

    return (
        <>
            <h1 className="text-3xl mb-10">Zafarie</h1>
            <div className="">
                <h2 className="text-2xl p-4 uppercase font-semibold bg-yellow-950 text-white flex justify-center">Hungriga just nu</h2>
                {hungryAnimals.length === 0 ? (
                    <p>Inga djur är hungriga just nu</p>
                ) : (
                    <ul className=" mt-10 flex flex-col justify-center items-center md:flex-row md:flex-wrap md:m-30">
                        {hungryAnimals.map(a =>(
                            <li key={a.id}>
                                <img
                                    src={a.imageUrl}
                                    alt='animal.name'
                                    className='w-[130px] h-[130px] object-cover rounded-full border-[7px] border-yellow-950 shadow-sm'
                                    onError={(e) => { e.currentTarget.src = `https://placehold.co/180x180?text=${encodeURIComponent(a.name)}`; }}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </>
    )
}