
import useAuth from "./../../../Hooks/useAuth";
import useAxiosSecure from "./../../../Hooks/useAsiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: team,
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teams?email=${user?.email}`);
      return res?.data;
    },
  });

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/teams/${id}`);
      

      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Team member has been deleted.",
          icon: "success",
        });

        refetch(); 
      }
    } catch (error) {
      console.error("Failed to delete asset:", error);
    }
  };

  return (
    <div>
      <div className="m-20">
        <div className="bg-slate-200 overflow-x-auto rounded-t-md">
          <table className="table ">
            <thead className="bg-green-600">
              <tr>
                <th></th>
                <th>SN</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Member Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {team?.map((singleUser, index) => (
                <tr key={singleUser?._id}>
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
                          {singleUser?.singleUser?.image ? (
                            <img
                              src={singleUser?.singleUser?.image}
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
                  <td>{singleUser?.singleUser?.name}</td>
                  <td>Employee</td>
                  <td className="flex justify-center items-center">
                    <button
                      onClick={() => handleDelete(singleUser?._id)}
                      className="bg-red-600 mt-5 text-white py-2 font-semibold px-6 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline-blue">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyEmployeeList;
