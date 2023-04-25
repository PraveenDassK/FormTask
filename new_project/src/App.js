import "./App.css";
import React from "react";
import "antd/dist/reset.css";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
  useLocation,
} from "react-router-dom";
import Home from "../src/pages/Home";
import AddNew from "./pages/Addnew";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form",
    element: <AddNew />,
  },
  {
    path: "/form/:id",
    element: <AddNew />,
  },
]);
function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
