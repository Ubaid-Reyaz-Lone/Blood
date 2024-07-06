import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import moment from "moment";
import { useSelector } from "react-redux";

const Donation = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  // Function to fetch donation data based on user role
  const getDonars = async () => {
    try {
      let response;
      if (user?.role === "donar") {
        response = await API.post("/inventory/get-inventory-hospital", {
          filters: {
            inventoryType: "in",
            donar: user?._id,
          },
        });
      } else {
        throw new Error("User is not authorized to view donations.");
      }

      if (response?.data?.success) {
        setData(response.data?.inventory);
      } else {
        throw new Error("Failed to fetch donation records");
      }
    } catch (error) {
      console.log("Error fetching donation records:", error);
    }
  };

  useEffect(() => {
    getDonars();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h2>My Donations</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Email</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donation;
