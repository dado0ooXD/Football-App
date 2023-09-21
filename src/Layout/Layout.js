import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = (props) => {
  return (
    <div className="main-container">
      {/* <div className="header"> */}
      <Header />
      {/* </div> */}
      <div className="content-container">
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <main className="content">{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
