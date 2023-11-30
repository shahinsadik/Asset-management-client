import React from 'react';
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from './../../Hooks/useAuth';
import useAxiosPublic from './../../Hooks/useAxiosPublic';
const SocialLogin = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const {signInGoogle}= useAuth()
    const handleGoogleLogin =()=>{
        signInGoogle()
        .then(res=>{
        const userInfo = {
            name: res?.user?.displayName,
            email: res?.user?.email,
        };
        axiosPublic.post("/users",userInfo )
        .then(res=>{
            console.log(res.data);
            Swal.fire({
                title: "WELCOME!",
                // text: "Registration successfully",
                icon: "success",
              });
            navigate("/")
        })
           
                
        })
        .catch(err=>console.error(err));
    }
    return (
        <div className="">
            <div className="divider">OR</div>
           <div className='flex justify-center items-center'>
           <button onClick={handleGoogleLogin} className="btn"><FcGoogle className="text-2xl"></FcGoogle> Sign in with google</button>  
           </div>
        </div>
    );
};

export default SocialLogin;