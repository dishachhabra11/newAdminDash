import React from "react";
import { useTheme } from "./ThemeContext";

const SideBar = () => {
  const { theme } = useTheme();
  return (
    <div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div
          className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top shadow-xl"
          style={{ backgroundColor: theme === "light" ? "#FFFAF0" : "" }}
        >
          {/* <a className="sidebar-brand brand-logo" href="index.html"><img src="assets/images/digitaldoor.png" alt="logo"/></a> */}
          <div className="navbar-profile" style={{ marginRight: "8px" }}>
            {/* <img
              className="img-sm rounded-circle"
              src="assets/images/imc.png"
              alt=""
            /> */}
          </div>
          <h3
            style={{
              color: theme === "light" ? "blue" : "white",
              cursor: "pointer",
            }}
          >
            ADMIN DASHBOARD
          </h3>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;