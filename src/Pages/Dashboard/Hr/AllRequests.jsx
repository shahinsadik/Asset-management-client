// AllRequests.js
// import React, { useState, useEffect } from 'react';
import useAxiosSecure from "./../../../Hooks/useAsiosSecure";
import { useQuery } from "@tanstack/react-query";
// import  Swal  from 'sweetalert2';
// import useTeam from './../../../Hooks/useTeam';
import useAuth from './../../../Hooks/useAuth';

const AllRequests = () => {
  
  const axiosSecure = useAxiosSecure();
  
const {user} = useAuth()
  const { data: member } = useQuery({
    queryKey: ["member" ],
    queryFn: async () => {
      
      const res = await axiosSecure.get("/full-teams");
      console.log(res);
      return res.data;
    },
  });
  const Email = member?.find(mem=>mem.userEmail === user?.email)
 
  const { data: allReq, isLoading, refetch } = useQuery({
    queryKey: ["allReq", Email?.userEmail ],
    queryFn: async () => {
      // const res = await axiosSecure.get("/req-assets");
      const res = await axiosSecure.get("/req-assets/all");
      console.log(res);
      return res.data;
    },
  });
  console.log(allReq);
 
 
  if (isLoading) {
    return <p>loading</p>;
  }
  const handleApprove = async (id) => {
    const  res = await axiosSecure.patch(`/req-assets/${id}`)
    console.log(res);
    
    refetch()

  };

  const handleReject = async (id) => {
    const res = await axiosSecure.delete(`/req-assets/${id}`)
    console.log(res.data);
    refetch()
  };

  return (
    <div className="mx-20">
      <div className="my-3 flex gap-5 items-center justify-between">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Asset Status
          </option>
          <option>pending</option>
          <option>Approved</option>
        </select>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Asset Type
          </option>
          <option>returnable</option>
          <option>non-returnable</option>
        </select>
      </div>
      <h2>Request List</h2>
      

      <div >
        <div className="bg-slate-200 overflow-x-auto rounded-t-md">
          <table className="table">
            <thead className="bg-[#d45934]">
              <tr>
                {/* <th>SN</th> */}

                <th className="">Product Name</th>
                <th>Product Type</th>
                <th>Email of requester </th>
                <th>Name of requester</th>
                <th>Request Date</th>
                <th>Additional note</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allReq?.map((request) => (
                <tr key={request._id}>
                  {/* <td>{index+1}</td> */}
                  <td>{request?.productName}</td>

                  <td>{request?.productType}</td>
                  <td>{request?.userEmail}</td>
                  <td>{request?.userName}</td>
                  <td>{request?.date}</td>
                  <td>{request?.note}</td>
                  <td>{request?.isPending ? "Approved" : "Pending"}</td>

                  <td className="flex flex-col justify-center items-center gap-5">
                    <button
                      disabled={request.isPending}
                      className="bg-[#d45934] text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                      onClick={() => handleApprove(request._id)}>
                      Approve
                    </button>
                    <button
                      className="bg-red-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline-blue"
                      onClick={() => handleReject(request._id)}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllRequests;
