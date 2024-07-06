import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];

  // Get Blood Group Data
  const getBloodGroupData = async () => {
    try {
      const response = await API.get("/analytics/bloodGroups-data");
      if (response.data?.success) {
        setData(response.data.bloodGroupData);
      } else {
        throw new Error("Failed to fetch blood group data");
      }
    } catch (error) {
      console.log("Error fetching blood group data:", error);
    }
  };

  // Get Recent Blood Records
  const getBloodRecords = async () => {
    try {
      const response = await API.get("inventory/get-recent-inventory");
      if (response.data?.success) {
        setInventoryData(response.data.inventory);
      } else {
        throw new Error("Failed to fetch recent blood records");
      }
    } catch (error) {
      console.log("Error fetching recent blood records:", error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data.map((record, i) => (
          <div
            className="card m-2 p-1"
            key={i}
            style={{ width: "18rem", backgroundColor: colors[i] }}
          >
            <div className="card-body">
              <h1 className="card-title bg-light text-dark text-center mb-3">
                {record.bloodGroup}
              </h1>
              <p className="card-text">
                totalIn: <b>{record.totalIn} (ML)</b>
              </p>
              <p className="card-text">
                totalOut: <b>{record.totalOut} (ML)</b>
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Total Available: <b>{record.availableBlood} (ML)</b>
            </div>
          </div>
        ))}
      </div>

      <div className="container my-3">
        <h1 className="my-3">Recent Blood Transactions</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity (ML)</th>
              <th scope="col">Donor Email</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} (ML)</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
