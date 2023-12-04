
import useUser from "./../../../Hooks/useUser";
import useAuth from './../../../Hooks/useAuth';
import useAxiosPublic from './../../../Hooks/useAxiosPublic';
import Swal  from 'sweetalert2';


const UserTable = () => {
  const [users] = useUser()
  const axiosPublic = useAxiosPublic()
 const {user} =useAuth()

  const handleAddToTeam = async (singleUser) => {
    
    
    try {
      const teamInfo ={
        userEmail: user.email,
        email: singleUser.email,
        name: singleUser.name,
        dob: singleUser.dob,
        image: singleUser.image

        
      }
      console.log(teamInfo);

      const res = await axiosPublic.post("/teams", teamInfo);

      if (res.data.insertedId) {
        
        Swal.fire({
          title: "Employee Added!",
          text: `${singleUser.name} added to your team` ,
          icon: "success",
        });
       
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add Employee",
        icon: "error",
      });
    }
    }
  return (
    <div className="m-20">
      <div className="bg-slate-200 overflow-x-auto rounded-t-md">
        <table className="table ">
          
          <thead className="bg-[#d45934]">
            <tr >
              <th>
                
              </th>
              <th>SN</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Member Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((singleUser, index) => (
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
                        {
                          singleUser.image ?
                          <img
                          src={singleUser?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                        :
                        <img
                          src="https://www.freeiconspng.com/thumbs/account-icon/account-icon-5.jpg"
                          alt="Avatar Tailwind CSS Component"
                        />
                        }
                      </div>
                    </div>
                  </div>
                </td>
                <td>{singleUser.name}</td>
                <td>Normal Employee</td>
                <td>
                  <button onClick={() => handleAddToTeam(singleUser)} className="btn btn-outline bg-[#d45934]">Add to the team</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
