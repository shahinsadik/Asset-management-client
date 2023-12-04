import useTeam from "./../../../Hooks/useTeam";
import useAuth from './../../../Hooks/useAuth';
import useAxiosSecure from './../../../Hooks/useAsiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyTeam = () => {
  const [team] =useTeam()

  console.log(team);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: teamMember, 
  } = useQuery({
    queryKey: ["teamMember",],
    queryFn: async () => {
      const res = await axiosSecure.get("/myTeams");
      
      return res?.data;
    },
    
  });
 const ownTeam = teamMember?.filter(t=> t.userEmail ===   team?.userEmail)
  
  console.log(ownTeam);
  return (
    <div className="mx-20">
      <div className="my-5">
      <h2 className="text-2xl text-center font-bold mb-4">Upcoming Events</h2>
      <h2 className="text-2xl my-10 text-red-600 text-center font-bold mb-4">No Upcoming Events found</h2>

      </div>
      <div >
        <div className="bg-slate-200 overflow-x-auto rounded-t-md">
          <table className="table ">
            <thead className="bg-green-600">
              <tr>
                <th></th>
                <th>SN</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Member Type</th>
                
              </tr>
            </thead>
            <tbody>
              {ownTeam?.map((singleUser, index) => (
                <tr key={singleUser._id}>
                  <td>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          {singleUser?.image ? (
                            <img
                              src={singleUser?.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          ) : (
                            <img
                              src="https://www.freeiconspng.com/thumbs/account-icon/account-icon-5.jpg"
                              alt="Avatar Tailwind CSS Component"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{singleUser?.name}</td>
                  <td>Employee</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;
