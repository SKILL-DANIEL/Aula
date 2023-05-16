import { createBrowserRouter } from "react-router-dom";

import { Login, Home, Dashboard, Aula, Schedule, NotFound } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <NotFound />
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <NotFound />
    },
    {
        element: <PrivateRoute/>,
        errorElement: <NotFound />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: '/dashboard/aula',
                        element: <Aula />,
                    },
                    {
                        path: '/dashboard/horario',
                        element: <Schedule />,
                    },
                ]
            }, 
        ]
    },
]);