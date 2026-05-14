import {link, useLocation} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
const location = useLocation();
const {user, logout} = useAuth();

return (
    <nav className="navbar">
    <h2>Nairobi Outfit Checker</h2>

    <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>

        <div className="user-info">
            {user.photoURL && (
                <img src={user.photoURL} alt="Profile" className="user-avatar" />
            )
            }
            <span className="user-name">Hi, {user.displayName}</span>
             <button onClick={logout} className="signout-btn">Sign out</button>
        </div>
      </div>
    </nav>
  )
}
export default Navbar