import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AllClasses from './../Pages/AllClasses/AllClasses';
import ClassDetails from "../Pages/ClassDetails/ClassDetails";
import TeachOnEducator from "../Pages/TeachOnEducator/TeachOnEducator";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import MyProfile from "../Myprofile/MyProfile";
import StudentDashboard from './../Student_Dashboard/StudentDashboard';
import AdminDashboard from './../Admin_Dashboard/AdminDashboard';
import TeacherRequest from "../Admin_Dashboard/TeacherRequest";
import Users from "../Admin_Dashboard/Users";
import EnrolledClass from "../Student_Dashboard/EnrolledClass";
import Payment from "../Payment/Payment";
import TeacherDashboard from "../TeacherDashboard/TeacherDashboard";
import AddClass from "../TeacherDashboard/AddClass";
import MyClass from "../TeacherDashboard/MyClass";
import SeeDetails from "../TeacherDashboard/SeeDetails";

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
      { path: "/payment/:id",
         element: <Payment /> 
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


    ],

  },{
  path: "student-dashboard",
  element: <StudentDashboard></StudentDashboard>,
  children:[
    {
      path: "profile",
      element: <MyProfile/>,
    },
    {
      path: "enrolled-classes",
      element: <EnrolledClass/>,
    },
  ]}
  ,{
  path: "admin-dashboard",
  element: <AdminDashboard></AdminDashboard>,
  children:[
    {
      path: "profile",
      element: <MyProfile/>,
    },
    {
      path: "teacher-request",
      element: <TeacherRequest/>,
    },
    {
      path: "users",
      element: <Users/>,
    },
  ]}
  ,{
  path: "teacher-dashboard",
  element: <TeacherDashboard></TeacherDashboard>,
  children:[
    {
      path: "profile",
      element: <MyProfile/>,
    },
    {
      path: "add-class",
      element: <AddClass/>,
    },
    {
      path: "my-class",
      element: <MyClass/>,
    },
    {
      path: "class-details/:id",
      element: <SeeDetails/>,
    },
  ]}
]);
