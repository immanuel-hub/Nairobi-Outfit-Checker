import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
const location = useLocation();
const {user, logOut} = useAuth();

return (
    <nav className="navbar">
    <h2>Nairobi Outfit Checker</h2>

    <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>

        <div className="user-info">
            {user.photoURL && (
                <img src={user.photoURL} alt="Profile" className="user-avatar" />
            )
            }
            <span className="user-name">Hi, {user.displayName}</span>
             <button onClick={logOut} className="signout-btn">Sign out</button>
        </div>
      </div>
    </nav>
  )
}
export default Navbar