import Index from "./Index";
import { createBrowserRouter } from "react-router-dom";
import Home from "./../Pages/Home";
import HrRegister from "./../Pages/Register/HrRegister";
import EmployeeRegister from "./../Pages/Register/EmployeeRegister";
import Login from "./../Pages/Login";
import Payment from "./../Pages/Payment/Payment";
import Dashboard from "./../Pages/Dashboard/Dashboard";
import HrHome from './../Pages/Dashboard/Hr/HrHome';
import MyEmployeeList from './../Pages/Dashboard/Hr/MyEmployeeList';
import AddEmployee from './../Pages/Dashboard/Hr/AddEmployee';
import AssetList from './../Pages/Dashboard/Hr/AssetList';
import AddAsset from './../Pages/Dashboard/Hr/AddAsset';
import AllRequests from './../Pages/Dashboard/Hr/AllRequests';
import CustomRequestsList from './../Pages/Dashboard/Hr/CustomRequestsList';
import EmHome from './../Pages/Dashboard/Employee/EmHome';
import MyTeam from './../Pages/Dashboard/Employee/MyTeam';
import MyAssets from './../Pages/Dashboard/Employee/MyAssets';
import RequestAsset from './../Pages/Dashboard/Employee/RequestAsset';
import MakeCustomRequest from './../Pages/Dashboard/Employee/MakeCustomRequest';
import Profile from './../Pages/Dashboard/Employee/Profile';
import HrProfile from './../Pages/Dashboard/Hr/HrHomePage/HrProfile';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index></Index>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "/hrRegister",
    element: <HrRegister></HrRegister>,
  },
  {
    path: "/emRegister",
    element: <EmployeeRegister></EmployeeRegister>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // hr 
      {
        path: "home",
        element: <HrHome></HrHome>,
      },
      {
        path: "employee-list",
        element: <MyEmployeeList></MyEmployeeList>,
      },
      {
        path: "add-employee",
        element: <AddEmployee></AddEmployee>,
      },
      {
        path: "asset-list",
        element: <AssetList></AssetList>,
      },
      {
        path: "add-asset",
        element: <AddAsset></AddAsset>,
      },
      {
        path: "all-req",
        element: <AllRequests></AllRequests>,
      },
      {
        path: "all-req",
        element: <AllRequests></AllRequests>,
      },
      {
        path: "req-list",
        element: <CustomRequestsList></CustomRequestsList>,
      },
      {
        path: "hr-profile",
        element: <HrProfile></HrProfile>,
      },
      // employee 
      {
        path: "em-home",
        element: <EmHome></EmHome>,
      },
      {
        path: "my-team",
        element: <MyTeam></MyTeam>,
      },
      {
        path: "my-asset",
        element: <MyAssets></MyAssets>,
      },
      {
        path: "req-asset",
        element: <RequestAsset></RequestAsset>,
      },
      {
        path: "custom-req",
        element: <MakeCustomRequest></MakeCustomRequest>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
export default router;
