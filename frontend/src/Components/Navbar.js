import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Ensure the path is correct
import './StyleElement/Navbar.css'; // Import the CSS file
import logo from './Images/Bus_Logo.PNG';
const Navbar = () => {
 const { user, isAuthenticated, logout } = useContext(AuthContext);
 return (
<nav className="navbar">
<div className="navbar-container">
<Link to="/" className="navbar-logo">
<img src={logo} alt="Spartan" className="navbar-logo-image" />
</Link>

<ul className="navbar-menu">
<li className="navbar-item">
<Link to="/" className="navbar-link">Home</Link>
</li>
{/* <li className="navbar-item">
<Link to="/bus-search" className="navbar-link">Book Ticket</Link>
</li> */}
<li className="navbar-item">
<Link to="/dashboard" className="navbar-link">Dashboard</Link>
</li>
         {user && user.role === 'admin' && (
<li className="navbar-item">
<Link to="/admin" className="navbar-link">Admin Dashboard</Link>
</li>
         )}
         {!isAuthenticated ? (
<>
<li className="navbar-item">
<Link to="/login" className="navbar-link">Login</Link>
</li>
<li className="navbar-item">
<Link to="/signup" className="navbar-link">Signup</Link>
</li>
</>
         ) : (
<li className="navbar-item">
<button className="navbar-logout" onClick={logout}>Logout</button>
</li>
         )}
</ul>
</div>
</nav>
 );
};
export default Navbar;