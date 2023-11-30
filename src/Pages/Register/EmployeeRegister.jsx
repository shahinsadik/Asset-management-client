
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import useAuth from './../../Hooks/useAuth';

const EmployeeRegister = () => {
  // Initialize necessary hooks
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Create user with email and password
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;

      // Update user profile with additional information
      await updateUserProfile(data.name);

      // Prepare user info for API request
      const userInfo = {
        name: data.name,
        email: data.email,
        companyName: data.companyName,
        package: data.package,
        dob: data.dob,
        image: data.image,
      };

      // Make API request to store user info
      const res = await axiosPublic.post("/users", userInfo);

      // Check if user info was successfully stored
      if (res.data.insertedId) {
        // Reset form and show success message
        reset();
        Swal.fire({
          title: "WELCOME!",
          text: "Registration successful",
          icon: "success",
        });
        // Navigate to the home page
        navigate("/");
      }
    } catch (error) {
      // Show error message if email is already used
      Swal.fire({
        title: "Error",
        text: 'Email is already used ',
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Ams || Employee Sign Up</title>
      </Helmet>
      <div className="bg-no-repeat bg-center bg-cover bg-[url('https://media.istockphoto.com/id/1266559436/photo/lock-icon-cyber-security-of-digital-data-network-protection-high-speed-connection-data.webp?b=1&s=170667a&w=0&k=20&c=Glqi-hCL9D8YrM5dFr_Tae0-ySZul_AfikPeTM5X30I')]">
        <div className="p-20 pt-5">
          <div className="">
            <div className="card w-screen-lg shadow-2xl bg-black bg-opacity-50">
              <h1 className="text-3xl text-white text-center font-black pt-10">
                Employee Sign Up Form
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
                        Image Link
                      </span>
                    </label>
                    <input
                      name="image"
                      type="text"
                      {...register("image", { required: true })}
                      placeholder="Image Link"
                      className="input input-bordered"
                    />
                    {errors.image && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className=" ">
                  <div className="w-full">
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
                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="bg-green-600 mt-5 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;
