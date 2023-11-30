import React, { useState, useEffect } from "react";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import useAuth from "./../../../Hooks/useAuth";

const EmHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [customRequests, setCustomRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [monthlyRequests, setMonthlyRequests] = useState([]);
  const [frequentlyRequestedItems, setFrequentlyRequestedItems] = useState([]);
  const [userInTeam, setUserInTeam] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch custom requests
        const customRequestsResponse = await axiosPublic.get(
          `/custom-assets?email=${user?.email}`
        );
        setCustomRequests(customRequestsResponse.data);

        // Fetch pending requests
        const pendingRequestsResponse = await axiosPublic.get(
          `/req-assets?email=${user?.email}`
        );
        setPendingRequests(pendingRequestsResponse.data);

        // Fetch monthly requests for the user in the current month
        const monthlyRequestsResponse = await axiosPublic.get(
          `/req-assets?email=${user?.email}`
        );
        setMonthlyRequests(monthlyRequestsResponse.data);

        // Fetch frequently requested items
        const frequentlyRequestedItemsResponse = await axiosPublic.get(
          `/req-assets?email=${user?.email}`
        );
        setFrequentlyRequestedItems(frequentlyRequestedItemsResponse.data);

        // Check if user is in a team
        const userTeamResponse = await axiosPublic.get("/userTeamStatus");
        setUserInTeam(userTeamResponse.data.inTeam);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosPublic, user?.email]);

  // Filter and sort monthly requests
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const filteredMonthlyRequests = monthlyRequests.filter(
    (request) =>
      new Date(request.date).getMonth() + 1 === currentMonth &&
      new Date(request.date).getFullYear() === currentYear
  );
  const sortedMonthlyRequests = filteredMonthlyRequests.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="m-20">
      {/* My Custom Requests Section */}
      <div>
        <h1 className="text-3xl font-bold text-center my-5">Custom Requests</h1>
        {customRequests.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {/* Display custom requests */}
            {customRequests?.slice(0, 3).map((request) => (
              <div key={request._id}>
                {/* Display request information */}
                <div className="card card-compact h-full bg-base-100 shadow-xl">
                  <div>
                    <div className="card-body">
                      <div className="flex justify-center items-center ">
                        <img
                          className="w-12"
                          src={request?.assetImage}
                          alt=""
                        />
                      </div>
                      <h2 className="card-title">{request.assetName}</h2>
                      <p>Price: ${request.assetPrice}</p>
                      <h3>Asset Type: {request.AssetType}</h3>
                      <h3>Status: Approved</h3>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Pending Requests Section */}
      <div>
        <h2 className="text-3xl font-bold text-center my-5">
          My Pending Requests
        </h2>
        {pendingRequests.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {/* Display pending requests */}
            {pendingRequests.slice(0, 3).map((request) => (
              <div key={request._id}>
                {request.isPending !== "true" ? (
                  <div>
                    {/* Display request information */}
                    <div className="card card-compact h-full bg-base-100 shadow-xl">
                      <div>
                        <div className="card-body">
                          <div className="flex justify-center items-center ">
                            <img
                              className="w-12"
                              src={request?.asset.AssetImage}
                              alt=""
                            />
                          </div>
                          <h2 className="card-title">{request.assetName}</h2>
                          <p>Name: ${request.asset.productName}</p>
                          <h3>Product Type: {request.asset.productType}</h3>
                          <h3>
                            Product Quantity: {request.asset.productQuantity}
                          </h3>
                          <h3>Date: {request.date}</h3>
                          <h3>Status: Pending</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Monthly Requests Section */}
      <div>
        <h2 className="text-3xl font-bold text-center my-5">
          My Monthly Requests ({sortedMonthlyRequests.length})
        </h2>
        {sortedMonthlyRequests.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {/* Display monthly requests */}
            {sortedMonthlyRequests.slice(0, 3).map((request) => (
              <div key={request._id}>
                <div className="card card-compact h-full bg-base-100 shadow-xl">
                  <div>
                    <div className="card-body">
                      <div className="flex justify-center items-center ">
                        <img
                          className="w-12"
                          src={request?.asset.AssetImage}
                          alt=""
                        />
                      </div>
                      <h2 className="card-title">{request.assetName}</h2>
                      <p>Name: ${request.asset.productName}</p>
                      <h3>Product Type: {request.asset.productType}</h3>
                      <h3>Product Quantity: {request.asset.productQuantity}</h3>
                      <h3>Date: {request.date}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Frequently Requested Items Section */}
      <div>
        <h2 className="text-3xl font-bold text-center my-5">
          Frequently Requested Items
        </h2>
        {frequentlyRequestedItems.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {/* Display frequently requested items */}
            {frequentlyRequestedItems?.slice(0, 4).map((item) => (
              <div key={item.id}>
                <div className="card card-compact h-full bg-base-100 shadow-2xl">
                  <div>
                    <div className="card-body">
                      <div >
                        <div className="flex justify-between items-center ">
                          <img
                            className="w-12"
                            src={item?.asset.AssetImage}
                            alt=""
                          />
                          <div>
                            <h2 className="card-title">{item.assetName}</h2>
                            <p>Name: ${item.asset.productName}</p>
                            <h3>Product Type: {item.asset.productType}</h3>

                            <h3>Date: {item.date}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message for users not in a team */}
      <div>
        {!userInTeam && (
          <div>
            <p>Contact your HR to join a team.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmHome;
