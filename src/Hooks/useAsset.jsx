import React from 'react';
import useAxiosSecure from './useAsiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useAsset = () => {
    const axiosSecure =useAxiosSecure()
    const {user} = useAuth()
    const {data: isPending, isPending: teamMember} = useQuery({
        queryKey: ['hr', user?.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/req-assets/all?email=${user?.email}`)
            return res.data.admin
        }
    })
    return [isPending,teamMember]
};

export default useAsset;