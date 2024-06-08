import React from "react";

import './index.css'

const AuthorizedLayout = ({ children }) => {
    return (
        <div style={{backgroundColr:"black"}}>
            {children}
        </div>
    );
}

export default AuthorizedLayout;
