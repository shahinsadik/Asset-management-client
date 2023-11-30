
import { useState, useEffect } from "react";
import axios from "axios"; 
const HrHome = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [topRequestedItems, setTopRequestedItems] = useState([]);
  const [limitedStockItems, setLimitedStockItems] = useState([]);
  const [returnableItemsPercentage, setReturnableItemsPercentage] = useState(0);
  const [nonReturnableItemsPercentage, setNonReturnableItemsPercentage] = useState(0);

  useEffect(() => {
    // Fetch data from your API or data source
    const fetchData = async () => {
      try {
        const pendingRequestsResponse = await axios.get("/api/pending-requests");
        setPendingRequests(pendingRequestsResponse.data);

        const topRequestedItemsResponse = await axios.get("/api/top-requested-items");
        setTopRequestedItems(topRequestedItemsResponse.data);

        const limitedStockItemsResponse = await axios.get("/api/limited-stock-items");
        setLimitedStockItems(limitedStockItemsResponse.data);

        // Fetch data for returnable and non-returnable items
        const returnableItemsResponse = await axios.get("/api/returnable-items");
        const nonReturnableItemsResponse = await axios.get("/api/non-returnable-items");

        const totalItems = returnableItemsResponse.data.length + nonReturnableItemsResponse.data.length;

        // Calculate percentages
        const returnablePercentage = (returnableItemsResponse.data.length / totalItems) * 100;
        const nonReturnablePercentage = (nonReturnableItemsResponse.data.length / totalItems) * 100;

        setReturnableItemsPercentage(returnablePercentage);
        setNonReturnableItemsPercentage(nonReturnablePercentage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
     <div>
      {/* Pending Requests Section */}
      <div>
        <h2>Pending Requests</h2>
        {/* <ul>
          {pendingRequests?.map((request) => (
            <li key={request.id}>{request.itemName}</li>
          ))}
        </ul> */}
      </div>

      {/* Top Requested Items Section */}
      <div>
        <h2>Top Requested Items</h2>
        {/* <ul>
          {topRequestedItems?.map((item) => (
            <li key={item.id}>{item.itemName}</li>
          ))}
        </ul> */}
      </div>

      {/* Limited Stock Items Section */}
      <div>
        <h2>Limited Stock Items</h2>
        {/* <ul>
          {limitedStockItems?.map((item) => (
            <li key={item.id}>{item.itemName}</li>
          ))}
        </ul> */}
      </div>

      {/* Pie Chart Section */}
      <div>
        <h2>Returnable vs Non-Returnable Items</h2>
        {/* Assume you have a PieChart component */}
        {/* <PieChart
          returnablePercentage={returnableItemsPercentage}
          nonReturnablePercentage={nonReturnableItemsPercentage}
        /> */}
      </div>

      {/* Extra Section 1 */}
      <div>
        <h2>Extra Section 1</h2>
        {/* Add your content for extra section 1 */}
      </div>

      {/* Extra Section 2 */}
      <div>
        <h2>Extra Section 2</h2>
        {/* Add your content for extra section 2 */}
      </div>
    </div>
    </div>
  );
};

export default HrHome;