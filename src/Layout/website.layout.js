import React from "react";

// import DesktopHeader from "../Components/Desktop/Header/DesktopHeader.Component";
// import DesktopFooter from "../Components/Desktop/Footer";

import Header from "../Components/Header";

import SideBar from "../Components/Sidebar";

import "./index.css"


import "./index.css"

const WebsiteLayout = ({ children }) => {
    return (
        <React.Fragment>

            {window.innerWidth > 480 ? (
                <Header />
            ) : (
                ""
            )}

            <div className="main-body">

                {/* {window.innerWidth > 480 ? (
                    <SideBar />
                ) : (
                    ""
                )} */}

                {children}

            </div>

            {/* {window.innerWidth > 480 ? (
                <DesktopFooter />
            ):(
               ""  
            )}  */}

        </React.Fragment>
    );
}
export default WebsiteLayout;