import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPhone, faClipboardList, faComments } from "@fortawesome/free-solid-svg-icons";
import { tabList } from "../data";
import logo from "../assets/logo-hortibom-v2.png";

export function Sidebar({ selectedPage, setPage }) {
  return (
    <nav
      style={{
        width: "220px",
        minHeight: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "var(--brand-color-secondary)",
        color: "var(--nav-text-color)",
        // borderTopRightRadius: "15px",
        // borderBottomRightRadius: "15px",
        boxShadow: "#cccccc 0px 0px 3px",
      }}
      className='sidebar'>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}>
        <img src={logo} alt='logo hortibom' style={{ width: "80%" }} />
        {/* <h1
          style={{
            marginTop: "5px",
            color: "rgba(255, 255, 255, 0.92)",
          }}>
          HortiBom
        </h1> */}
      </div>

      <ul
        style={{
          // borderTop: "1px rgb(164, 164, 164) solid",
          listStyle: "none",
        }}>
        {tabList.map(page => {
          return (
            <li
              key={page.id}
              style={{
                paddingLeft: "25px",
                display: "flex",
                alignItems: "center",
                height: "60px",
                cursor: "pointer",
                backgroundColor: selectedPage === page.name ? "var(--brand-color)" : null,
              }}
              onClick={() => setPage(page.name)}>
              <div style={{ width: "30px", textAlign: "center" }}>
                <FontAwesomeIcon icon={page.icon} />
              </div>
              <div>{page.name}</div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Sidebar;
