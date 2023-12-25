import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import History from "../pages/History";
import Main from "../pages/Main";
import Statistics from "../pages/Statistics";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
    ],
  },
]);

export default router;
