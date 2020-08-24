import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./SidebarLeft.css";
import { useStateValue } from "./../../context/StateProvider";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

function SidebarLeft() {
  const [{ user }] = useStateValue();
  const classes = useStyles();

  return (
    <div className="sidebar__left">
      <div className="sidebar__userWrapper">
        <div className="sidebar__avatar">
          <Avatar className={classes.large}>
            {user.displayName && user.displayName.slice(0, 1)}
          </Avatar>
        </div>
        <div className="sidebar__userDetails">
          <h4 className="sidebar__username">{user.displayName}</h4>
          <p className="sidebar__userRole">Developer</p>
        </div>
      </div>
    </div>
  );
}

export default SidebarLeft;
