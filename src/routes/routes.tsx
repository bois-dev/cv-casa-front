import { createBrowserRouter } from "react-router-dom";
import { Configurations } from "../features/configs/config.page";
import RegisterCheck from "../features/register-email/register-check.page";
import RegisterEmail from "../features/register-email/register-email.page";
import { ErrorPage } from "./error.page";
import { ProtectedRoute } from "./protected.route";
import Login from "../features/login/login.page";
import SearchUsers from "../features/search-users/search-users.page";
import { Propaganda } from "../features/propaganda/propaganda.page";
//import RegisterUser from "../features/register-user/register-user.page";
import RegisterRealtor from "../features/register-realtor/register-realtor.page";

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
        path: "/register-realtor",
        element: <RegisterRealtor />,
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
        path: '/dashboard',
        element: <SearchUsers />
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])