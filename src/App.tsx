import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/Router";

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;