import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', 
});

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logOut} = useAuth()
    // request to interceptoe header add to authorization every secure all the api calls
    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access-token");
            // console.log("Request intercepted:",  token);
            config.headers.authorization = `Bearer ${token}`;
          return config;
        },
        (error) => {
        //   console.error("Request error:", error);
          return Promise.reject(error);
        }
      );
        // INTERCEPTOE 401, 403 STATUS
        axiosSecure.interceptors.response.use(function(response) {
            return response
        }, async (error)=>{
            const status = error.response.status
            if(status===401 || status===403){
                await logOut()
                navigate('/login')
            }
            return Promise.reject(status);  
        })

    return axiosSecure;
};

export default useAxiosSecure;
