import { createBrowserRouter } from "react-router";
import Root from "./layouts/Root";
import AppLayout from "./layouts/AppLayout";
import ErrorBoundary from "./layouts/ErrorBoundary";
import Home from "./routes/home/index.jsx";
import Login from "./routes/login/index.jsx";
import Register from "./routes/register/index.jsx";
import { authMiddleware } from "./middleware/auth";
import { guestMiddleware } from "./middleware/guest";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    ErrorBoundary,
    children: [
      {
        middleware: [authMiddleware],
        Component: AppLayout,
        children: [
          {
            index: true,
            Component: Home,
          },
        ],
      },
      {
        middleware: [guestMiddleware],
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "register",
            Component: Register,
          },
        ],
      },
    ],
  },
]);
