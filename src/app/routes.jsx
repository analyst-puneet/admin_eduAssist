import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "./views/sessions/session-routes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./views/sessions/NotFound";
import humanResourceRoutes from "app/views/human_resources/HumanResourceRoutes";
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));

const routes = [
  { path: "/", element: <Navigate to="dashboard/default" /> },
  {
    element: <MatxLayout />,
    children: [
      ...materialRoutes.map(route => ({
        ...route,
        element: <PrivateRoute>{route.element}</PrivateRoute>
      })),
      ...humanResourceRoutes.map(route => ({
        ...route,
        element: <PrivateRoute>{route.element}</PrivateRoute>
      })),
      {
        path: "/dashboard/default",
        element: (
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        ),
      },
      {
        path: "/charts/echarts",
        element: (
          <PrivateRoute>
            <AppEchart />
          </PrivateRoute>
        ),
      }
      
    ]
  },
  ...sessionRoutes.filter(route => route.path !== "*"), // Exclude NotFound route
  {
    path: "/session/login",
    element: <Navigate to="/session/signin" />, // Redirect to signin
  },
  {
    path: "*",
    element: <NotFound />,
  }
];

export default routes;
