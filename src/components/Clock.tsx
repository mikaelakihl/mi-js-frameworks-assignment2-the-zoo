import { useAnimals } from "../context/AnimalsContext";

export const Clock = () => {

    const { now, getAnimal } = useAnimals();
    const fedAt = local.fedAtById[animal.id];
    const msLeft = HUNGER_WINDOW - (now - fedAt);

    const secondsLeft = Math.max(0, Math.floor(msLeft / 1000));
  
    const timeString = new Date(now).toLocaleTimeString();
  
    return <div>Klockan är: {timeString}</div>;
  };