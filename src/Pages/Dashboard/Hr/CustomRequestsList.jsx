import React from "react";
import useAuth from "./../../../Hooks/useAuth";
// import useAxiosPublic from './../../../Hooks/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hooks/useAsiosSecure";
import Swal from "sweetalert2";

const CustomRequestsList = () => {
  
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: customAsset, refetch } = useQuery({
    queryKey: ["customAsset", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/custom-assets/list?email=${user?.email}`);
      // const res = await axiosSecure.get(`/custom-assets/list?email=${user?.email}`);
      console.log(res);
      return res.data;
    },
  });
  console.log(customAsset);
  
  const handleApprove = async (id) => {
    await axiosSecure.patch(`/custom-assets/${id}`);
    refetch();
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Approved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleReject = async (id) => {
    await axiosSecure.delete(`/custom-assets/${id}`);

    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Reject",
      showConfirmButton: false,
      timer: 1500,
    });
    refetch();
  };
  console.log(customAsset);
  return (
    <div>
      <div className="mx-20 mt-5">
        <div className="bg-slate-200 overflow-x-auto rounded-t-md">
          <table className="table ">
            <thead className="bg-[#d45934]">
              <tr>
                <th>SN</th>
                <th>Asset Image</th>
                <th>Asset Name</th>
                <th>Price</th>
                <th>Asset Type</th>
                <th>Why you need this</th>
                <th>Additional information</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customAsset?.map((asset, index) => (
                <tr key={asset._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          {asset?.AssetImage ? (
                            <img
                              src={asset?.AssetImage}
                              alt="Avatar Tailwind CSS Component"
                            />
                          ) : (
                            <img
                              src="https://www.freeiconspng.com/thumbs/account-icon/account-icon-5.jpg"
                              alt="Avatar Tailwind CSS Component"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{asset?.assetName}</td>
                  <td>{asset?.assetPrice}</td>
                  <td>{asset?.AssetType}</td>
                  <td>{asset?.assetWhyNeed}</td>
                  <td>{asset?.assetInformation?.slice(0, 50)}...</td>

                  <td className="flex flex-col justify-center items-center gap-5">
                    <button
                      disabled={asset.isPending}
                      className="bg-[#d45934] text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                      onClick={() => handleApprove(asset._id)}>
                      Approve
                    </button>
                    <button
                      className="bg-red-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline-blue"
                      onClick={() => handleReject(asset._id)}>
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

export default CustomRequestsList;
