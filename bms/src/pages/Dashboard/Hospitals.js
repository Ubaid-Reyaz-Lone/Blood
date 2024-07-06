import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const Hospitals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Function to fetch hospitals data
  const getHospitals = async () => {
    try {
      const response = await API.get("/inventory/get-hospitals");
      if (response.data?.success) {
        setData(response.data?.hospitals);
      } else {
        throw new Error("Failed to fetch hospital records");
      }
    } catch (error) {
      console.log("Error fetching hospital records:", error);
    } finally {
      setLoading(false); // Set loading state to false when API call is done
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    ); // Show loading message or spinner while fetching data
  }

  return (
    <Layout>
      <div className="container mt-4">
        <h2>Hospital Records</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.hospitalName}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.address}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Hospitals;
