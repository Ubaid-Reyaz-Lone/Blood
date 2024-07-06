import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { useSelector } from "react-redux";

const OrganisationPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Function to fetch organisation data based on user role
  const getOrg = async () => {
    try {
      let response;
      if (user?.role === "donar") {
        response = await API.get("/inventory/get-organisation");
      } else if (user?.role === "hospital") {
        response = await API.get("/inventory/get-organisation-for-hospital");
      }

      if (response?.data?.success) {
        setData(response.data?.organisations);
      } else {
        throw new Error("Failed to fetch organisation records");
      }
    } catch (error) {
      console.log("Error fetching organisation records:", error);
    } finally {
      setLoading(false); // Set loading state to false when API call is done
    }
  };

  useEffect(() => {
    getOrg();
  }, [user]);

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
        <h2>Organisation Records</h2>
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
                <td>{record.organisationName}</td>
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

export default OrganisationPage;
