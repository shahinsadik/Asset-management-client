import React, { useState } from "react";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyAssets = () => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: myAssets = [], refetch } = useQuery({
    queryKey: ["myAssets", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/assets?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const [selectedAssetId, setSelectedAssetId] = useState(null);

  const handleDelete = async (id) => {
    try {
      // Make an asynchronous request to delete the asset
      const res = await axiosPublic.delete(`/assets/${id}`);

      if (res.data.deletedCount > 0) {
        
        console.log("Asset deleted successfully!");

        
        refetch();
      }
    } catch (error) {
      
      console.error("Failed to delete asset:", error);
    }
  };

  const handleUpdateModal = (asset) => {
    // Populate the form with the asset's data
    setValue("ProductName", asset.productName);
    setValue("AssetImage", asset.AssetImage);
    setValue("AssetType", asset.productType);
    setValue("ProductQuantity", asset.productQuantity);

    // Set the selected asset ID
    setSelectedAssetId(asset._id);

    // Open the update modal
    const modal = document.getElementById("my_modal_6");
    modal.checked = true;
  };

  const onSubmit = async (data) => {
    try {
      // Ensure selectedAssetId is available
      if (!selectedAssetId) {
        console.error("No asset selected for update.");
        return;
      }

      // Update the asset using the selectedAssetId
      const res = await axiosPublic.put(`/assets/${selectedAssetId}`, data);

      if (res.data) {
        // Handle success, show notification, etc.
        console.log("Asset updated successfully!");

        // Close the update modal
        const modal = document.getElementById("my_modal_6");
        modal.checked = false;

        // Clear the selected asset ID
        setSelectedAssetId(null);

        // Refetch data to update the UI
        refetch();
      }
    } catch (error) {
      // Handle error, show error notification, etc.
      console.error("Failed to update asset:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Asset List for {user?.email}</h2>
      </div>
      <div className="m-20">
        <div className="bg-slate-200 overflow-x-auto rounded-t-md">
          <table className="table">
            <thead className="bg-green-600">
              <tr>
                <th></th>
                <th>SN</th>
                <th>Product Image</th>
                <th className="">Product Name</th>
                <th>Product Type</th>
                <th>Product Quantity </th>
                <th>Product Action </th>
              </tr>
            </thead>
            <tbody>
              {myAssets.map((asset, index) => (
                <tr key={index}>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        id={`assetCheckbox_${index}`}
                      />
                    </label>
                  </td>
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
                  <td>{asset?.productName}</td>
                  <td>{asset?.productType}</td>
                  <td>{asset?.productQuantity}</td>
                  <td className="flex flex-col gap-2 m-3">
                    <div>
                      <label
                        htmlFor={`assetCheckbox_${index}`}
                        className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                        onClick={() => handleUpdateModal(asset)}
                      >
                        Update
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id={`assetCheckbox_${index}`}
                        className="modal-toggle"
                      />
                      <div className="modal" role="dialog">
                        <div className="modal-box">
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="card-body"
                          >
                            <div className="">
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text font-semibold text-slate-600">
                                    Product Name
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  {...register("ProductName", {
                                    required: true,
                                  })}
                                  placeholder="Product Name"
                                  className="input input-bordered"
                                  defaultValue={asset.ProductName}
                                />
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text font-semibold text-slate-600">
                                    Product Image url
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  {...register("AssetImage", {
                                    required: true,
                                  })}
                                  placeholder="Product Image Url"
                                  className="input input-bordered"
                                />
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text font-semibold text-slate-600">
                                    Asset Type
                                  </span>
                                </label>
                                <select
                                  defaultValue="default"
                                  {...register("AssetType", { required: true })}
                                  className="select select-bordered w-full"
                                  required
                                >
                                  <option value="default" disabled>
                                    Asset Type
                                  </option>
                                  <option value="Returnable">Returnable</option>
                                  <option value="Non-returnable">
                                    Non-returnable
                                  </option>
                                </select>
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text font-semibold text-slate-600">
                                    Product Quantity
                                  </span>
                                </label>
                                <input
                                  type="number"
                                  {...register("ProductQuantity")}
                                  placeholder="Product Quantity"
                                  className="input input-bordered"
                                />
                              </div>
                            </div>

                            <div className="flex justify-center mt-5">
                              <button
                                type="submit"
                                className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                              >
                                Update
                              </button>
                            </div>
                          </form>
                          <div className="modal-action">
                            <label
                              htmlFor={`assetCheckbox_${index}`}
                              className="btn"
                            >
                              Close!
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(asset._id)}
                      className="bg-red-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline-blue"
                    >
                      Delete
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

export default MyAssets;
