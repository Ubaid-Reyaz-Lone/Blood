import React from "react";
import bmsPic2 from "../../AllImages/bmsPic2.jpg";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

export default function MyRegister() {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <>
      {error && <span>{error}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src={bmsPic2} alt="registrationImage" />
          </div>
          <div className="col-md-4 form-container">
            <Form
              formTitle="Registration Page"
              submitBtn="Register"
              formType="register"
            />
          </div>
        </div>
      )}
    </>
  );
}
