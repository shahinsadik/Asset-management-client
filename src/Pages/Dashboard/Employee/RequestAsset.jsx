import { useState, useEffect } from "react";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import useAuth from "./../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const RequestAsset = () => {
  const axiosPublic = useAxiosPublic();
  const [note, setNote] = useState();
  const { user } = useAuth();

  const { data: reqAsset = [] } = useQuery({
    queryKey: ["reqAsset", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/assets?email=${user?.email}&status=pending`
      );
      console.log(res.data);
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    assetName: "",
    price: "",
    assetType: "",
    assetImage: "",
    whyYouNeedThis: "",
    additionalInformation: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");
  const [requestStatusFilter, setRequestStatusFilter] = useState("all");
  console.log(searchQuery);
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(
          `/req-assets?search=${searchQuery}&availability=${availabilityFilter}&assetType=${assetTypeFilter}&status=${requestStatusFilter}`
        );
        setFilteredAssets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    searchQuery,
    availabilityFilter,
    assetTypeFilter,
    requestStatusFilter,
    axiosPublic,
  ]);

  const handleRequest = async (asset) => {
    console.log(asset);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Intl.DateTimeFormat("en-US", options).format(new Date());
    try {
      const assetInfo = {
        userEmail: user.email,
        userName: user.displayName,
        date: date,
        note,
        asset,
        isPending: false,
      };
      console.log(assetInfo);

      const res = await axiosPublic.post("/req-assets", assetInfo);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Request Added!",
          text: "Request added successfully",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add Asset Custom Request",
        icon: "error",
      });
    }
  };

  return (
    <div className="m-20">
      <div className="bg-[#fdc89d] p-5 rounded-lg">
        <div className="flex justify-between ">
          <div>
            <label htmlFor="search">Search </label>
            <input
              type="text"
              id="search"
              placeholder="Search by Asset Name"
              className="input input-bordered w-full max-w-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="availabilityFilter">Filter:</label>
            <select
              className="select select-bordered w-full max-w-xs"
              id="availabilityFilter"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <div>
            <label htmlFor="assetTypeFilter">Filter Type: </label>
            <select
              className="select select-bordered w-full max-w-xs"
              id="assetTypeFilter"
              value={assetTypeFilter}
              onChange={(e) => setAssetTypeFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-returnable</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <ul>
          {filteredAssets.map((asset) => (
            <div key={asset._id}>
              <div className="card card-compact h-full bg-base-100 shadow-xl">
                <div>{asset.name}</div>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div>
        <div>
          <div className="">
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
                  {reqAsset?.map((asset, index) => (
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
                      <div className="flex items-center justify-center gap-2 mt-5">
                        <div>
                          <label
                            htmlFor="my_modal_6"
                            className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                            Request
                          </label>
                          <input
                            type="checkbox"
                            id="my_modal_6"
                            className="modal-toggle"
                          />
                          <div className="modal" role="dialog">
                            <div className="modal-box">
                              <div className="flex justify-center items-center">
                                <img
                                  className="w-32"
                                  src={asset?.AssetImage}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                              <h1 className="font-semibold">
                                Product Name: {asset?.productName}
                              </h1>
                              <h1>Type: {asset?.productType}</h1>
                              <h1>Quantity: {asset?.productQuantity}</h1>
                              <p className="py-4">Additional notes</p>
                              <textarea
                                className="textarea textarea-bordered w-full"
                                required
                                onChange={(e) => setNote(e.target.value)}
                                name="note"
                                placeholder="Additional notes"></textarea>
                              <div className="modal-action">
                                <label htmlFor="my_modal_6" className="btn">
                                  Close!
                                </label>
                                <button
                                  onClick={() => handleRequest(asset)}
                                  className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                                  Request
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestAsset;
