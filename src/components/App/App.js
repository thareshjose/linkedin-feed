import React from "react";
import "./App.scss";
import Header from "../Header/Header";
import Feed from "../Feed/Feed";
import SidebarLeft from "../SIdebarLeft/SidebarLeft";
import SidebarRight from "./../SidebarRight/SidebarRight";
import { useStateValue } from "./../../context/StateProvider";

function App() {
  const [{ user }] = useStateValue();
  return (
    <div className="app">
      <Header />
      <div className="app__content">
        {user && <SidebarLeft />}
        <Feed />
        <SidebarRight />
      </div>
    </div>
  );
}

export default App;
