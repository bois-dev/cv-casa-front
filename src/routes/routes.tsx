import { createBrowserRouter } from "react-router-dom";
import { Configurations } from "../features/configs/config.page";
import { Propaganda } from "../features/propaganda/propaganda.page";
import RegisterCheck from "../features/register-email/register-check.page";
import RegisterEmail from "../features/register-email/register-email.page";
import { ErrorPage } from "./error.page";
import { ProtectedRoute } from "./protected.route";
import Login from "../features/login/login.page";

export const router = createBrowserRouter([
    {
        path: "/config",
        element: (<ProtectedRoute> <Configurations /> </ProtectedRoute>),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <RegisterEmail />,
    },
    {
        path: "/register-check",
        element: <RegisterCheck />,
    },
    {
        path: '/',
        element: <Propaganda />
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])