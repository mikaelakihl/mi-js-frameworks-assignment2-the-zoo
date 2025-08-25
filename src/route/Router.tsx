
import { createBrowserRouter } from "react-router-dom";
import { AnimalDetailsPage } from "../pages/AnimalDetailsPage";
import { AnimalPage } from "../pages/AnimalPage";
import { HomePage } from "../pages/HomePage";
import { Layout } from "../pages/Layout";

export const router = createBrowserRouter ([
    {
        path: '/',
        element: <Layout/>,
        children: [
            { 
                index: true, 
                element: <HomePage /> },
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: 'animals',
                element: <AnimalPage/>
            },
            {
                path: 'animals/:id',
                element: <AnimalDetailsPage/>
            }
        ]
    }
])