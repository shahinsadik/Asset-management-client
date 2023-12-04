import { useState, useEffect } from "react";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import useAuth from "./../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useTeam from "./../../../Hooks/useTeam";

const RequestAsset = () => {
  const axiosPublic = useAxiosPublic();
  const [note, setNote] = useState();
  const { user } = useAuth();
  const [team] = useTeam();
  const userEmail = team?.userEmail
  const [searchQuery, setSearchQuery] = useState("");
  const [modalData, setModalData] = useState({});

  const {
    data: reqAsset,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reqAsset", user?.email, searchQuery],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/assets?email=${userEmail}&search=${searchQuery}`
      );
      console.log(res.data);
      return res.data;
    },
  });
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/assets?search=${searchQuery}`);
        setFilteredAssets(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery, axiosPublic]);

  const handleRequest = async (asset) => {
    
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Intl.DateTimeFormat("en-US", options).format(new Date());
    try {
      const assetInfo = {
        email: user.email,
        userEmail: modalData.email,
        userName: user.displayName,
        productName: modalData.productName,
        productType: modalData.productType,
        productQuantity: modalData?.productQuantity,
        AssetImage: modalData.AssetImage,
        date: date,
        note,
        asset,
        isPending: false,
      };

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
  const handleOpenModal = async (id) => {
    const res = await axiosPublic.get(`/assets/${id}`);
    setModalData(res.data);
    document.getElementById("my_modal_5").showModal();
  };
  return (
    <div className="m-20">
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search now"
          className="input input-bordered w-full max-w-xs"
        />
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Filter
          </option>

          <option>pending</option>
          <option>Approved</option>
        </select>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Filter
          </option>

          <option>returnable</option>
          <option>non-returnable</option>
        </select>
        <ul>
          {filteredAssets?.map((asset) => (
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
                      <td>
                        <div className="flex items-center justify-center gap-2 mt-5">
                          {/* Open the modal using document.getElementById('ID').showModal() method */}
                          <button
                            className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                            onClick={() => handleOpenModal(asset?._id)}>
                            Request
                          </button>
                          <dialog
                            id="my_modal_5"
                            className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                              <div className="flex justify-center items-center">
                                <img
                                  className="w-32"
                                  src={modalData?.AssetImage}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                              <h1 className="font-semibold">
                                Product Name: {modalData?.productName}
                              </h1>
                              <h1>Type: {modalData?.productType}</h1>
                              <h1>Quantity: {modalData?.productQuantity}</h1>
                              <p className="py-4">Additional notes</p>
                              <textarea
                                className="textarea textarea-bordered w-full"
                                required
                                onChange={(e) => setNote(e.target.value)}
                                name="note"
                                placeholder="Additional notes"></textarea>
                              <div className="modal-action">
                                <form method="dialog">
                                  {/* if there is a button in form, it will close the modal */}
                                  <button className="btn">Close</button>
                                <button
                                  onClick={() => handleRequest(asset)}
                                  className="bg-green-600 text-white py-2 font-semibold px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                                  Confirm
                                </button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                        </div>
                      </td>
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
