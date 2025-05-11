import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

const route = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardPage /></PrivateRoute>
    }
])

export default route