import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./../../../Hooks/useAuth";

const AssetList = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: assetList = [] } = useQuery({
    queryKey: ["assetList", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/assets?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <div>
        <h2>Asset List for {user?.email}</h2>
      </div>
      <div className="m-20">
        <div className="bg-slate-200 overflow-x-auto rounded-t-md">
          <table className="table">
            <thead className="bg-green-600">
              <tr>
                <th></th>
                <th>SN</th>
                <th>Product Image</th>
                <th className="">Product Name</th>
                <th>Product Type</th>
                <th>Product Quantity </th>
                <th>Product Action </th>
              </tr>
            </thead>
            <tbody>
              {assetList.map((asset, index) => (
                <tr key={index}>
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
                          {asset?.AssetImage ? (
                            <img
                              src={asset?.AssetImage}
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
                  <td>{asset?.productName}</td>
                  <td>{asset?.productType}</td>
                  <td>{asset?.productQuantity}</td>
                  <div className="flex flex-col gap-2 m-3">
                    <button className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                      Update
                    </button>
                    <button className="bg-red-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline-blue">
                      Delete
                    </button>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetList;
