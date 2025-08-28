import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/Router";
import { AnimalProvider } from "./context/AnimalsContext";

export const App = () => {
  return (
  <AnimalProvider>
    <RouterProvider router={router} />
  </AnimalProvider>
  )
};

export default App;