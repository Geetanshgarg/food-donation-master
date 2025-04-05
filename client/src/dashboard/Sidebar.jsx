import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaHome, FaUser, FaListAlt, FaHandsHelping, FaTimes } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const sideItems = [
    {
      text: "Home",
      logo: <FaHome />,
      path: "/dashboard",
    },
    {
      text: "Food",
      logo: <FaListAlt />,
      path: "/dashboard/food",
    },
    {
      text: "Profile",
      logo: <FaUser />,
      path: "/dashboard/profile",
    },
  ];

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <Link to="/" className="logo-link">
          <h1>
            <span className="logo-text">
              FOOD<span className="logo-highlight">RESCUE</span>
            </span>
          </h1>
        </Link>
        <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>
          <FaTimes />
        </button>
      </div>
      
      <div className="sidebar-body">
        {sideItems.map((item, index) => (
          <div
            key={index}
            className={`sidebar-item ${active === item.path.substring(1) ? "active" : ""}`}
            onClick={() => {
              navigate(item.path);
              closeSidebar();
            }}
          >
            <div className="sidebar-item-icon">{item.logo}</div>
            <div className="sidebar-item-text">{item.text}</div>
          </div>
        ))}
        
        {email === "abhyuday7176@gmail.com" && (
          <div
            className={`sidebar-item ${active === "admin" ? "active" : ""}`}
            onClick={() => {
              navigate("/dashboard/admin");
              closeSidebar();
            }}
          >
            <div className="sidebar-item-icon"><FaUser /></div>
            <div className="sidebar-item-text">Admin</div>
          </div>
        )}
      </div>
      
      <div className="sidebar-footer">
        <p>© {new Date().getFullYear()} Food Rescue</p>
      </div>
    </div>
  );
};

export default Sidebar;
