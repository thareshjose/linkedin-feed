import React from "react";
import "./HeaderItem.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function HeaderItem({ Icon, text, active, avatar }) {
  return (
    <div className={`headerItem ${active && "headerItem--active"}`}>
      {avatar ? (
        <>
          <Icon src="" alt={text} className="headerItem__avatar" />
          <label className="headerItem__avatarText">
            {text}
            <ArrowDropDownIcon className="headerItem__avatarArrow" />
          </label>
        </>
      ) : (
        <>
          <Icon style={{ fontSize: "20px" }} />
          <h2 className="headerItem__text">{text}</h2>
        </>
      )}
      {/* Hide text when on tablets and lesser sizes */}
    </div>
  );
}

export default HeaderItem;
