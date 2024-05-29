// import React from "react"

// import { Link } from "react-router-dom"

// import "./index.css"

// import {Auth} from "../context/Auth.Context"

// import { useNavigate } from 'react-router-dom';

// const Header = () => {

//     const auth = Auth();

//     const navigate = useNavigate();


//     const logout = () => {
//         auth.activateAuthentication(false);
//         auth.activateToken("");
//         localStorage.removeItem("token");
//         localStorage.removeItem("refreshCycle");
//         localStorage.removeItem("user");
//         navigate("/");
//     };



//     return (
//         <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'grey', height: '130px' }}>
//             <div className="container">
//                 <div className="d-flex justify-content-between w-100">
//                     <div>
//                         <img src="Untitled design.png" style={{ height: '170px', width: '170px' }} />
//                     </div>

//                     <button 
//                         className="navbar-toggler"
//                         type="button"
//                         data-toggle="collapse"
//                         data-target="#navbarNav"
//                         aria-controls="navbarNav"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                 </div>

//                 {/* --------------------- Data ------------------------------ */}
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav" style={{ marginLeft: '80px' }}> {/* Centering the navbar items */}
//                         <li className="nav-item active mt-2">
//                             <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
//                                 Home
//                             </Link>
//                         </li>

//                         <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
//                             <Link to="/aboutus" style={{ textDecoration: 'none', color: 'white' }}>
//                                 About
//                             </Link>
//                         </li>


//                         <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
//                             <Link to="/help" style={{ textDecoration: 'none', color: 'white' }}>
//                                 Help
//                             </Link>
//                         </li>

//                         <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
//                             <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
//                                 Profile
//                             </Link>
//                         </li>

//                         <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
//                             <Link to="/recharge" style={{ textDecoration: 'none', color: 'white' }}>
//                                 Deposit
//                             </Link>
//                         </li>

//                         <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
//                             <Link to="/addwallet" style={{ textDecoration: 'none', color: 'white' }}>
//                                 Add Wallet 
//                             </Link>
//                         </li>
                        
//                         <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
//                             <Link to="/witdarwal" style={{ textDecoration: 'none', color: 'white' }}>
//                                 Witdarwal
//                             </Link>
//                         </li>

//                         <li className="nav-item mt-2" style={{ marginLeft: '80px' }}>
//                             <button style={{border:"none", backgroundColor:'transparent', color:"white"}} onClick={logout}>
//                                 Logout
//                             </button>
//                         </li>

//                     </ul>
//                 </div>



//             </div>
//         </nav>
//     )
// }

// export default Header