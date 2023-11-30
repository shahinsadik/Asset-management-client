import React from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import useAuth from "./../../../Hooks/useAuth";
const MakeCustomRequest = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const assetInfo = {
        userEmail: user.email,
        assetName: data.AssetName,
        assetPrice: data.AssetPrice,
        AssetType: data.AssetType,
        assetInformation: data.information,
        assetWhyNeed: data.WhyNeed,
        assetImage: data.AssetImage,
        isPending: false,
      };
      console.log(assetInfo);

      const res = await axiosPublic.post("/custom-assets", assetInfo);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Custom Request Added!",
          text: "Custom Request added successfully",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add Asset Custom Request",
        icon: "error",
      });
    }
  };
  return (
    <div>
      <div>
        <Helmet>
          <title>Ams||Make a Custom Request</title>
        </Helmet>
        <div className="mx-20 mt-10">
          <div className="card  shadow-2xl bg-[#fb923c] bg-opacity-50">
            <h1 className="pt-10 text-3xl font-bold text-center">
              Make a Custom Request
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="">
                <div className="flex gap-5">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Asset Name
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("AssetName", { required: true })}
                      placeholder="Asset Name"
                      className="input input-bordered"
                      required
                    />
                    {errors.AssetName && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Asset Price
                      </span>
                    </label>
                    <input
                      type="number"
                      {...register("AssetPrice", { required: true })}
                      placeholder="Asset Price"
                      className="input input-bordered"
                      required
                    />
                    {errors.AssetPrice && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-5">
                  
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
                      required>
                      <option value="default" disabled>
                        Asset Type
                      </option>
                      <option value="Returnable">Returnable</option>
                      <option value="Non-returnable">Non-returnable</option>
                    </select>
                    {errors.AssetType && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Asset Image
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("AssetImage", { required: true })}
                      placeholder="Asset Image url"
                      className="input input-bordered"
                      required
                    />
                    {errors.AssetImage && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Additional information
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("information", { required: true })}
                      placeholder=" Additional information"
                      className="input input-bordered"
                      required
                    />
                    {errors.information && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Why you need this
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("WhyNeed", { required: true })}
                      placeholder="Why you need this"
                      className="input input-bordered"
                      required
                    />
                    {errors.WhyNeed && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                  Make a Custom Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeCustomRequest;
