import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AllClasses from './../Pages/AllClasses/AllClasses';
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
import TeachOnEducator from "../Pages/TeachOnEducator/TeachOnEducator";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import MyProfile from "../Myprofile/MyProfile";

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
         element: <ClassDetails /> 
        }, 
      { path: "/teach",
         element: <TeachOnEducator /> 
        }, 
      { path: "/signin",
         element: <SignIn /> 
        }, 
      { path: "/signup",
         element: <SignUp /> 
        }, 
      { path: "/myprofile",
         element: <MyProfile /> 
        }, 

    ],
  },
]);
