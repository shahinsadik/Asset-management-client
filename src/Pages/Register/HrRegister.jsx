import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./../../Hooks/useAuth";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";

const IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`;

const HrRegister = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      console.log(loggedUser);

      const imageFile = { image: data.logoImage[0] };
      const img = await axiosPublic.post(IMAGE_HOSTING_API, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await updateUserProfile(data.name, img.data.data.url);

      const userInfo = {
        name: data.name,
        email: data.email,
        companyLogo: img.data.data.url,
        companyName: data.companyName,
        package: data.package,
        dob: data.dob,
        isPayment: false,
      };

      const res = await axiosPublic.post("/hr", userInfo);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "WELCOME!",
          text: "Registration successful",
          icon: "success",
        });
        navigate("/payment");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: 'Email is already used ',
        icon: ""
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Ams||Hr Sign Up</title>
      </Helmet>
      <div className="bg-no-repeat bg-center bg-cover bg-[url('https://media.istockphoto.com/id/1266559436/photo/lock-icon-cyber-security-of-digital-data-network-protection-high-speed-connection-data.webp?b=1&s=170667a&w=0&k=20&c=Glqi-hCL9D8YrM5dFr_Tae0-ySZul_AfikPeTM5X30I=')]">
        <div className="p-20 pt-5">
          <div className="">
            <div className="card w-screen-lg  shadow-2xl bg-black bg-opacity-80">
              <h1 className="text-3xl text-white text-center font-black pt-10">
                Hr Sign Up Form
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="flex gap-5 ">
                  <div className="form-control w-full  ">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Full Name"
                      className="input input-bordered"
                      required
                    />
                    {errors.name && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-control w-full  ">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Email
                      </span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="Email"
                      className="input input-bordered"
                    />
                    {errors.email && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="form-control w-full  ">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Date of Birth
                      </span>
                    </label>
                    <input
                      type="date"
                      {...register("dob", { required: true })}
                      placeholder="Date of Birth"
                      className="input input-bordered"
                      required
                    />
                    {errors.dob && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-control w-full  ">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Company Name
                      </span>
                    </label>
                    <input
                      type="text"
                      {...register("companyName", { required: true })}
                      placeholder="Company Name"
                      className="input input-bordered"
                      required
                    />
                    {errors.companyName && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Select Package
                      </span>
                    </label>
                    <select
                      
                      {...register("package", { required: true })}
                      className="select select-bordered w-full "
                      required
                    >
                      <option  disabled selected>
                        Select Package
                      </option>
                      <option value="5">5 Members for $5</option>
                      <option value="8">10 Members for $8</option>
                      <option value="15">20 Members for $15</option>
                    </select>
                  </div>

                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Company Logo
                      </span>
                    </label>
                    <input
                      {...register("logoImage", { required: true })}
                      type="file"
                      className="file-input file-input-bordered w-full "
                      required
                    />
                  </div>
                </div>
                <div className="">
                  <div className="form-control w-full  ">
                    <label className="label">
                      <span className="label-text font-semibold text-slate-600">
                        Password
                      </span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                      })}
                      className="input input-bordered "
                    />
                    {errors.password && (
                      <span className="text-red-600">
                        Password must be between 6 and 20 characters
                      </span>
                    )}
                  </div>
                </div>

                <div className=" flex justify-center mt-5 ">
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrRegister;
