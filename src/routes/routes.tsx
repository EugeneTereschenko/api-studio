import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import History from "../pages/History";
import Collections from "../pages/Collections";
import MockServer from "../pages/MockServer";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "history",
                element: <History />,
            },
            {
                path: "collections",
                element: <Collections />,
            },
            {
                path: "mock-server",
                element: <MockServer />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
        ],
    },
]);