import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import useAuth from "./../../../Hooks/useAuth";
import useAxiosSecure from "./../../../Hooks/useAsiosSecure";
import MyEmployeeList from "./MyEmployeeList";

const HrHome = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [topRequestedItems, setTopRequestedItems] = useState([]);
  const [limitedStockItems, setLimitedStockItems] = useState([]);
  const [returnableItemsPercentage, setReturnableItemsPercentage] = useState(0);
  const [nonReturnableItemsPercentage, setNonReturnableItemsPercentage] =
    useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // chart
  const [state, setState]=useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Returnable", "Non-Returnable"]
      }
    },
    series: [
      {
        name: "Assets",
        data: [30, 40,]
      }
    ]
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingRequestsResponse = await axiosSecure.get(
          `/custom-assets/ad?email=${user?.email}`
        );

        setPendingRequests(pendingRequestsResponse);

        const topRequestedItemsResponse = await axiosSecure.get(
          "/req-assets/ad"
        );

        setTopRequestedItems(topRequestedItemsResponse.data);

        const limitedStockItemsResponse = await axiosSecure.get(
          `/assets/ad?email=${user?.email}`
        );
        setLimitedStockItems(limitedStockItemsResponse.data);

        // Fetch data for returnable and non-returnable items
        const returnableItemsResponse = await axiosSecure.get("");
        const nonReturnableItemsResponse = await axiosSecure.get("");

        const totalItems =
          returnableItemsResponse.data.length +
          nonReturnableItemsResponse.data.length;

        // Calculate percentages
        const returnablePercentage =
          (returnableItemsResponse.data.length / totalItems) * 100;
        const nonReturnablePercentage =
          (nonReturnableItemsResponse.data.length / totalItems) * 100;

        setReturnableItemsPercentage(returnablePercentage);
        setNonReturnableItemsPercentage(nonReturnablePercentage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?.email, axiosSecure]);

 
  
  return (
    <div className="mx-20">
      <div>
        {/* Pending Requests Section */}
        {pendingRequests?.data?.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center my-5">
              My Custom Requests
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Display pending requests */}
              {pendingRequests.data.slice(0, 3).map((request) => (
                <div key={request._id}>
                  {request.isPending !== "true" && (
                    <div className="card card-compact h-full bg-base-100 shadow-xl">
                      <div className="card-body">
                        <div className="flex gap-5 justify-between items-center ">
                          <div>
                            <img
                              className="w-20"
                              src={request.assetImage}
                              alt=""
                            />
                          </div>
                          <div>
                            <h2 className="card-title">{request.assetName}</h2>
                            <h3>Product Type: {request.AssetType}</h3>
                            <h3>Requester: {request.email}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Requested Items Section */}
        {topRequestedItems?.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center my-5">
              Top Requested Items
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {topRequestedItems.slice(0, 4).map((request) => (
                <div key={request._id}>
                  {request.isPending !== "true" && (
                    <div className="card card-compact h-full bg-base-100 shadow-xl">
                      <div className="card-body">
                        <div className="flex gap-2 items-center ">
                          <div>
                            <img
                              className="w-20 h-12"
                              src={request.AssetImage}
                              alt=""
                            />
                          </div>
                          <div>
                            <h2 className="card-title">
                              {request.productName?.slice(0, 30)}
                            </h2>
                            <h3>Product Type: {request.productType}</h3>
                            <h3>Quantity: {request.productQuantity}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Limited Stock Items Section */}
        {limitedStockItems?.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-center my-5">
              Limited Stock Items
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {limitedStockItems?.slice(0, 4).map((request) => (
                <div key={request._id}>
                  {parseInt(request?.productQuantity) < 10 && (
                    <div className="card card-compact h-full bg-base-100 shadow-xl">
                      <div className="card-body">
                        <div className="flex gap-2 items-center">
                          <div>
                            <img
                              className="w-20 h-12"
                              src={request?.AssetImage}
                              alt=""
                            />
                          </div>
                          <div>
                            <h2 className="card-title">
                              {request?.productName?.slice(0, 30)}
                            </h2>
                            <h3>Product Type: {request?.productType}</h3>
                            <h3>Quantity: {request?.productQuantity}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Pie Chart Section */}
        <div className="flex justify-center">
        
          <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="800"
              height="300"
            />
        </div>



        {/* Extra Section 1 */}
        <div>
          <h2>Extra Section 1</h2>
          {/* Add your content for extra section 1 */}
        </div>

        {/* Extra Section 2 */}
        <div>
          <h2 className="text-3xl font-bold text-center ">My Employee List </h2>
          <MyEmployeeList></MyEmployeeList>
        </div>
      </div>
    </div>
  );
};

export default HrHome;
