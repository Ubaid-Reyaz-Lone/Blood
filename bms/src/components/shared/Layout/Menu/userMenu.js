import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../Styles/Layout.css";
import { useSelector } from "react-redux";

// Import the userMenu array
import { userMenu } from "./Menu/userMenu";

const SideMenu = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {/* Render menu items based on user role */}
          {user && (
            <>
              {user.role === "organisation" && (
                <>
                  {userMenu.map((menu) => (
                    <div
                      key={menu.name}
                      className={`menu-item ${
                        location.pathname === menu.path && "active"
                      }`}
                    >
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  ))}
                </>
              )}

              {(user.role === "donar" || user.role === "hospital") && (
                <div
                  className={`menu-item ${
                    location.pathname === "/organisation" && "active"
                  }`}
                >
                  <i className="fa-solid fa-building-ngo"></i>
                  <Link to="/organisation">Organisation</Link>
                </div>
              )}

              {user.role === "hospital" && (
                <div
                  className={`menu-item ${
                    location.pathname === "/consumer" && "active"
                  }`}
                >
                  <i className="fa-solid fa-republican"></i>
                  <Link to="/consumer">Consumer</Link>
                </div>
              )}

              {user.role === "donar" && (
                <div
                  className={`menu-item ${
                    location.pathname === "/donation" && "active"
                  }`}
                >
                  <i className="fa-solid fa-hand-holding-dollar"></i>
                  <Link to="/donation">Donation</Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
