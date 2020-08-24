import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import HeaderItem from "../HeaderItem/HeaderItem";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import WorkIcon from "@material-ui/icons/Work";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AppsIcon from "@material-ui/icons/Apps";

import "./Header.scss";
import { Avatar } from "@material-ui/core";
import Search from "./../Search/Search";
import Authentication from "./../Authentication/Authentication";
import { useStateValue } from "./../../context/StateProvider";

function Header() {
  const [{ user }] = useStateValue();

  return (
    <div className="header">
      <div className={`header__items ${!user && "header__items--collapsed"}`}>
        <div className="header__left">
          <LinkedInIcon style={{ color: "#0077B5", fontSize: "40px" }} />
        </div>
        <div className="header__center">
          <Search />
        </div>
        {user && (
          <div className="header__right">
            <HeaderItem Icon={HomeIcon} text="Home" active />
            <HeaderItem Icon={PeopleIcon} text="My Network" />
            <HeaderItem Icon={WorkIcon} text="Jobs" />
            <HeaderItem Icon={InsertCommentIcon} text="Messaging" />
            <HeaderItem Icon={NotificationsIcon} text="Notifications" />
            <HeaderItem Icon={Avatar} text="Me" avatar />
            <HeaderItem Icon={AppsIcon} text="Work" />
          </div>
        )}
        <Authentication />
        {/* Update image with username/photo  */}
      </div>
    </div>
  );
}

export default Header;
