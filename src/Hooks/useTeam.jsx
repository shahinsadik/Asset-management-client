import { useQuery } from '@tanstack/react-query';


import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';


const useTeam = () => {
    const axiosSecure = useAxiosPublic()
    const {user} = useAuth();
    
    const {data: team, isPending: loading, refetch} = useQuery({
        queryKey: ['team'],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/teams?email=${user?.email}`)
            return res?.data;
        }
    })
    return [team,loading, refetch];
}
export default useTeam;
