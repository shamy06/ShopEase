import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { SidebarData } from "./SidebarData";
import "../Component.css";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const usersData = JSON.parse(localStorage.getItem("userData") || "[]");
  const Username = localStorage.getItem("signUp");

  let userEmail = usersData.map((elements) => {
    if (elements.userName === Username) {
      return elements.emailId;
    }
  });
  userEmail = userEmail.find((item) => item !== undefined);

  return (
    <>
      <div className="sidebar">
        <div className="menu-bars">
          <FaIcons.FaBars
            onClick={showSidebar}
            onBlur={() => setSidebar(false)}
          />
        </div>
      </div>
      <div className={sidebar ? "menu active" : "menu"}>
        <ul className="menu-items" onClick={showSidebar}>
          <li className="toggle">
            <div className="menu-close">
              <AiIcons.AiOutlineClose />
            </div>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.Name}>
                <NavLink to={item.path}>
                  {item.icon}
                  <span id="title">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="sidebarprofileData2">
          <BsPersonCircle id="sidebarProfileIcon" />
        </div>
        <div className="sidebarprofileData">
          <span id="sidebarusername">{Username}</span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
