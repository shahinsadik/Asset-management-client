
import { Helmet } from "react-helmet-async";
import  Swal  from 'sweetalert2';
import useAuth from './../Hooks/useAuth';
import SocialLogin from './Shared/SocialLogin';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate()
  const {signInUser}= useAuth()
  
  const handleLogin = async (e) => {
    e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;
  console.log(email, password);
    try {
      const res = await signInUser(email, password);
      const user = res.user;
     
      Swal.fire({
        title: "WELCOME!",
        text: "Login successfully",
        icon: "success"
      })
      navigate("/dashboard/home")

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: 'Invalid email/ password',
        icon: ""
      });
    }
  };
  return (
    <div className="h-screen">
      <div>
        <Helmet>
          <title>Ams||Sign in</title>
        </Helmet>
        <div className="">
          <div>
            <div className="h-screen bg-no-repeat bg-center bg-cover bg-[url('https://media.istockphoto.com/id/1266559436/photo/lock-icon-cyber-security-of-digital-data-network-protection-high-speed-connection-data.webp?b=1&s=170667a&w=0&k=20&c=Glqi-hCL9D8YrM5dFr_Tae0-ySZul_AfikPeTM5X30I=')]">
              <div className="  ">
                <div className="p-20 pt-5">
                  <div className="card w-screen-lg  shadow-2xl bg-black bg-opacity-50">
                    <h1 className="text-3xl text-white text-center font-black pt-10">
                      Sign in Form
                    </h1>
                    <div className=" ">
                      <form
                        onSubmit={handleLogin}
                        className="card-body">
                        <div className="form-control w-full  ">
                          <label className="label">
                            <span className="label-text font-semibold text-slate-600">
                              Email
                            </span>
                          </label>
                          <input
                            name="email"
                            type="email"
                            required
                            placeholder="Email"
                            className="input input-bordered"
                          />
                          
                        </div>

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
                              required
                              className="input input-bordered "
                            />
                            
                          </div>
                        </div>
                        <div className=" flex justify-center mt-5 ">
                          <button
                            type="submit"
                            className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                            Sign in
                          </button>
                        </div>

                        <SocialLogin></SocialLogin>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
