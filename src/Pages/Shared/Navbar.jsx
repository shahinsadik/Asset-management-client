// Navbar.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaEnvelope, FaHome, FaList, FaSearch, FaUsers, FaListOl, FaUserPlus, FaUserEdit } from "react-icons/fa";
import useAuth from './../../Hooks/useAuth';
import useHr from './../../Hooks/useHr';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [hr] = useHr();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  const renderEmployeeLinks = () => (
    <>
      <li>
        <NavLink to="/dashboard/em-home">
          <FaHome /> Employee Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-team">
          <FaSearch /> My Team
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-asset">
          <FaListOl /> My Assets
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/req-asset">
          <FaUserPlus /> Request for an Asset
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/custom-req">
          <FaEnvelope /> Make a Custom Request
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile">
          <FaUserEdit /> Profile
        </NavLink>
      </li>
    </>
  );

  const renderHrLinks = () => (
    <>
      <h1 className='text-2xl font-black text-gray-500 text-center'>Hr Section</h1>
      <li>
        <NavLink to="/dashboard/hrhome">
          <FaHome /> Hr Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/employee-list">
          <FaUsers /> My Employee List
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-employee">
          <FaUserPlus /> Add an Employee
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/asset-list">
          <FaUsers /> Asset List
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-asset">
          <FaUserPlus /> Add an Asset
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-req">
          <FaList /> All Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/req-list">
          <FaListOl /> Custom Requests List
        </NavLink>
      </li>
    </>
  );

  const links = (
    <>
      <li className="font-bold text-white text-lg mr-3">
        <NavLink to="/">Home</NavLink>
      </li>
      {user ? (
        <>
          {user.role === "employee" && renderEmployeeLinks()}
          {user.role === "hr" && renderHrLinks()}
        </>
      ) : (
        <>
          <li className="font-bold text-white text-lg rounded-lg bg-green-600 mr-2">
            <Link to="/emRegister">
              <button>Join as Employee</button>
            </Link>
          </li>
          <li className="font-bold mr-2 text-white text-lg rounded-lg bg-green-600">
            <Link to="/hrRegister">
              <button>Join as HR</button>
            </Link>
          </li>
          <li className="font-bold text-white text-lg bg-orange-600 rounded-lg">
            <Link to="/login">
              <button>Login</button>
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="fixed z-10 w-full">
      <div className="">
        <div className="navbar bg-gray-400 drop-shadow-2xl  ">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-[#6c63ff] rounded-box lg:w-52">
                {links}
              </ul>
            </div>
            <Link to="/" className="ml-5 normal-case text-2xl text-white">
              <span className="text-[#ff3c00] font-black">A</span>M
              <span className="text-green-800 font-black">S</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 ">{links}</ul>
          </div>
          <div className="navbar-end ">
            <>
              {user ? (
                <div className="dropdown dropdown-end ">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar bg-white">
                    <div className="w-10 rounded-full">
                      <img src="https://imagedelivery.net/5MYSbk45M80qAwecrlKzdQ/dee97162-41b2-4e11-1d58-1d86f8ac3a00/preview" alt="user-avatar" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box lg:w-52">
                    <li>
                      <a className="font-semibold">Name: {user?.displayName}</a>
                    </li>
                    <li>
                      <a className="font-semibold">Dashboard</a>
                    </li>
                    <li>
                      <a className="font-semibold">Edit Profile</a>
                    </li>
                    <a
                      onClick={handleLogOut}
                      className="btn mt-1 btn-md font-bold text-white hover:text-[#ff3c00] border-none bg-[#ff3c00]">
                      {" "}
                      Log Out
                    </a>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
