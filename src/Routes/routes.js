import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Loggin from "../Shared/Loggin/Loggin";
import Signin from "../Shared/Signin/Signin";
import AddToCart from "../pages/AddToCart";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Home></Home></PrivateRoute>
            },
            {
                path: '/signup',
                element: <Signin></Signin>
            },
            {
                path: '/login',
                element: <Loggin></Loggin>
            },
            {
                path: '/cart',
                element: <PrivateRoute><AddToCart></AddToCart></PrivateRoute>
            },
        ]
    },
]);

export default router;