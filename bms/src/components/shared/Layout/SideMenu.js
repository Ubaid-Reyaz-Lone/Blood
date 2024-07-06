import React from "react";
// import { userMenu } from "./Menu/userMenu";
import { Link, useLocation } from "react-router-dom";
import "../../../Styles/Layout.css";
import { useSelector } from "react-redux";
const SideMenu = () => {
  const location = useLocation();
  // const isActive = location.pathname;

  // get user by React-Redux
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {/* 


           */}

          {user?.role === "organisation" && (
            <>
              {/* Inventory */}
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className={"fa-solid fa-warehouse"}></i>
                <Link to="/">Inventory</Link>
              </div>

              {/* Donar */}
              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
              >
                <i className={"fa-solid fa-hand-holding-medical"}></i>
                <Link to="/donar">Donar</Link>
              </div>

              {/* Hospital */}
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className={"fa-solid fa-hospital"}></i>
                <Link to="/hospital">Hospital</Link>
              </div>
            </>
          )}

          {(user?.role === "donar" || user?.role === "hospital") && (
            <div
              className={`menu-item ${
                location.pathname === "/organisation" && "active"
              }`}
            >
              <i className="fa-solid fa-building-ngo"></i>
              <Link to="/organisation">Organisation</Link>
            </div>
          )}

          {user?.role === "hospital" && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
            >
              <i className="fa-solid fa-republican"></i>
              <Link to="/consumer">Consumer</Link>
            </div>
          )}

          {user?.role === "donar" && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <Link to="/donation">Donation</Link>
            </div>
          )}

          {/* {userMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`menu-item ${isActive && "active"}`}
                key={menu.name}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
