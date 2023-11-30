import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaUsers,
  FaListOl,
  FaUserPlus,
  FaUserEdit 
 
} from "react-icons/fa";

import useHr from './../../Hooks/useHr';
import useAuth from './../../Hooks/useAuth';

const Dashboard = () => {
  const { logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  
  const [isAdmin] = useHr();
  console.log(isAdmin);

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-[#fb923c] bg-opacity-50">
        <ul className="menu">
          
            <>
              {
                isAdmin === true? 
                <>
                <h1 className='text-2xl font-black text-gray-500 text-center'>Hr Section</h1>
                <li>
                <NavLink to="/dashboard/home">
                  <FaHome></FaHome> Hr Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/employee-list">
                  <FaUsers> </FaUsers> My Employee List

                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-employee">
                  <FaUserPlus></FaUserPlus> Add an Employee

                </NavLink>
              </li>
              
              <li>
                <NavLink to="/dashboard/asset-list">
                  <FaUsers></FaUsers> Asset List

                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-asset">
                  <FaUserPlus></FaUserPlus> Add an Asset
 
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-req">
                  <FaList></FaList> All Requests
 
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/req-list">
                  <FaListOl></FaListOl> Custom Requests List

                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/hr-profile">
                  <FaListOl></FaListOl> Profile

                </NavLink>
              </li>
                </>
                :
                <>
                {/* Employee */}
                 <h1 className='text-2xl font-black text-gray-500 text-center'>Employee Section</h1>
              <li>
                <NavLink to="/dashboard/em-home">
                  <FaHome></FaHome> Employee Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-team">
                  <FaSearch></FaSearch> My Team
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-asset">
                  <FaListOl></FaListOl> My Assets
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/req-asset">
                  <FaUserPlus></FaUserPlus> Request for an Asset
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/custom-req">
                  <FaEnvelope></FaEnvelope> Make a Custom Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <FaUserEdit ></FaUserEdit> Profile
                </NavLink>
              </li>
                </>
              }
             
            </>
            <a
                      onClick={handleLogOut}
                      className="btn mt-1 btn-md font-bold text-white hover:text-[#ff3c00] border-none bg-[#ff3c00]">
                      {" "}
                      Log Out
                    </a>
        </ul>
      </div>
      <div className="flex-1 ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
