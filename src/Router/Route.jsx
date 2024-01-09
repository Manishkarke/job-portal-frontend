import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
const AppRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default AppRoutes;
