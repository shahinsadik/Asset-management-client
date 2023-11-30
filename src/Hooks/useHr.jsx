
import useAxiosSecure from './useAsiosSecure';

import {useQuery} from '@tanstack/react-query'
import useAuth from './useAuth';

const useHr = () => {
    const axiosSecure =useAxiosSecure()
    const {user} = useAuth()
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: ['hr', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/hr/admin?email=${user?.email}`)
            return res.data.admin
        }
    })
    return [isAdmin,isAdminLoading]
};

export default useHr;