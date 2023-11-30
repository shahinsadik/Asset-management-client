import { useState } from "react";
import useAuth from "./../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

import useAxiosPublic from './../../../Hooks/useAxiosPublic';

const Profile = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.displayName || "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dob || "");
  const [updateSuccess, setUpdateSuccess] = useState(false);
    const axiosPublic = useAxiosPublic()
  const handleUpdate = async () => {
    try {
      // Make an API request to update user information
      const response = await axiosPublic.patch(`/users/${user?._id}`, {
        fullName,
        dateOfBirth,
      });

      if (response.status === 200) {
        setUpdateSuccess(true);
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div className="m-20">
      <Helmet>
        <title>Ams || Profile</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center">Profile</h1>
      <div className="border mb-5 p-5">
        <h1 className="font-bold text-center">Profile information</h1>
        <img src={user?.img} alt="" />
        <h1>Name: {user?.displayName}</h1>
        <h1>Email: {user?.email}</h1>
        <h1>Date of Birth: {user?.dob || "Not provided"}</h1>
        {updateSuccess && (
          <p style={{ color: "green" }}>Update successful!</p>
        )}
      </div>
      <div className="border mb-5 p-5">
        <h1 className="font-bold pb-3 text-center">
          Update Profile information
        </h1>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            className="input mb-2 input-bordered w-full max-w-xs"
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            className="input mb-2 input-bordered w-full max-w-xs"
            type="date"
            id="dob"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <button
          className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
