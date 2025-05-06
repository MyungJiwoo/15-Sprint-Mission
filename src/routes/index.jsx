import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import ItemsPage from "@pages/items-page";
import LandingPage from "@pages/landing-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "items",
        element: <ItemsPage />,
      },
    ],
  },
]);

export default router;
