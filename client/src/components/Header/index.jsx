import { Link } from "react-router-dom";

import Auth from "../../utils/auth"; //Make later...

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <Link to="/">About Us</Link>
      <Link to="/home">Home</Link>
      <Link to="/newpost">Create Post</Link>

      <div>
        {Auth.loggedIn() ? (
          <>
            <Link to="/me">{Auth.getProfile().data.username}'s profile</Link>
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
