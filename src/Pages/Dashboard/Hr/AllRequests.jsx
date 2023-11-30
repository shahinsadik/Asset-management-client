// AllRequests.js
// import React, { useState, useEffect } from 'react';
import useAxiosSecure from "./../../../Hooks/useAsiosSecure";
import useAuth from "./../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import  Swal  from 'sweetalert2';

const AllRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // const [requests, setRequests] = useState([]);

  const { data: allReq = [], isLoading, refetch } = useQuery({
    queryKey: ["allReq", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/req-assets?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(user);
  console.log(allReq.length);
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
    <div>
      <h2>Request List</h2>
      

      <div className="m-20">
        <div className="bg-slate-200 overflow-x-auto rounded-t-md">
          <table className="table">
            <thead className="bg-green-600">
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
                  <td>{request?.asset.productName}</td>

                  <td>{request?.asset.productType}</td>
                  <td>{request?.asset.userEmail}</td>
                  <td>{request?.userName}</td>
                  <td>{request?.date}</td>
                  <td>{request?.note}</td>
                  <td>{request?.isPending ? "Approved" : "Pending"}</td>

                  <td className="flex flex-col justify-center items-center gap-5">
                    <button
                      disabled={request.isPending}
                      className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
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
