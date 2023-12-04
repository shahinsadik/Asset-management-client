import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useTeam = () => {
  const axiosSecure = useAxiosPublic();
  const { user } = useAuth();

  const {
    data: team,
    loading,
    refetch,
  } = useQuery({
    queryKey: ["team", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teams?email=${user?.email}`);
      return res?.data;
    },
  });

  // Conditionally render loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  return [team, loading, refetch];
};

export default useTeam;
