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
import ClassReview from "../Admin_Dashboard/ClassReview";
import PaymentSuccess from "../Payment/PaymentSuccess";
import EnrolledClassDetails from "../Student_Dashboard/EnrolledClassDetails";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main> </Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      { path: "/allclasses",
         element: <AllClasses /> 
        }, 
      { path: "/class/:id",
         element: <PrivateRoute><ClassDetails />  </PrivateRoute> 
        }, 
      { path: "/payment/:id",
         element:<PrivateRoute> <Payment /> </PrivateRoute>
        }, 
      { path: "/payment-success/:paymentId",
         element:<PrivateRoute> <PaymentSuccess /> </PrivateRoute> 
        }, 
      { path: "/teach",
         element:<PrivateRoute> <TeachOnEducator /> </PrivateRoute> 
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
    {
      path: "myenroll-class/:id",
      element: <EnrolledClassDetails/>,
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
    {
      path: "class-review",
      element: <ClassReview></ClassReview>,
    },
    {
      path: "class-details/:id",
      element: <SeeDetails/>,
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
