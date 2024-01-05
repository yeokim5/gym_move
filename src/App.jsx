import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WorkoutPage, { routineLoader } from "./pages/WorkoutPage";

const router = createBrowserRouter([
  {
    path: "/gym_move/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "/gym_move/workout/:id",
        element: <WorkoutPage />,
        loader: routineLoader,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      {/* <div className="App" style={{ width: "90%" }}> */}
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
