import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AllClasses from './../Pages/AllClasses/AllClasses';
import ClassDetails from "../Pages/ClassDetails/ClassDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main> </Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allclasses",
        element: <AllClasses></AllClasses>,
      },
      { path: "/class/:id",
         element: <ClassDetails /> }, 

    ],
  },
]);
