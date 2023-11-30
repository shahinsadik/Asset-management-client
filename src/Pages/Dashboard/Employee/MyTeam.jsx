import useTeam from "./../../../Hooks/useTeam";

const MyTeam = () => {
  const [team] = useTeam();
  console.log(team, "team list");
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
                
              </tr>
            </thead>
            <tbody>
              {team?.map((singleUser, index) => (
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
