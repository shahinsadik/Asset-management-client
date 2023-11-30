import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import useAuth from "./../../../Hooks/useAuth";

const AddAsset = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

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
        productName: data.ProductName,
        productType: data.AssetType, // Fix: Correct property name
        productQuantity: data.ProductQuantity,
        AssetImage: data.AssetImage,
      };

      const res = await axiosPublic.post("/assets", assetInfo);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Asset Added!",
          text: "Asset added successfully",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add asset",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Ams||Add Asset</title>
      </Helmet>
      <div className="mx-20 mt-10">
        <div className="card w-screen-lg shadow-2xl bg-[#fb923c] bg-opacity-50">
          <h1 className="pt-10 text-3xl font-bold text-center">Add as Asset</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-slate-600">
                    Product Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("ProductName", { required: true })}
                  placeholder="Product Name"
                  className="input input-bordered"
                  required
                />
                {errors.ProductName && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-slate-600">
                    Product Image url
                  </span>
                </label>
                <input
                  type="text"
                  {...register("AssetImage", { required: true })}
                  placeholder="Product Image Url"
                  className="input input-bordered"
                  required
                />
                {errors.AssetImage && (
                  <span className="text-red-600">This field is required</span>
                )}
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
                  required>
                  <option value="default" disabled>
                    Asset Type
                  </option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
                {errors.AssetType && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-slate-600">
                    Product Quantity
                  </span>
                </label>
                <input
                  type="number"
                  {...register("ProductQuantity", { required: true })}
                  placeholder="Product Quantity"
                  className="input input-bordered"
                  required
                />
                {errors.ProductQuantity && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                Add Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
