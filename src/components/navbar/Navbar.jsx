import "./Navbar.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in when component mounts
    setIsLoggedIn(user !== null);
  }, [user]); // Re-run effect whenever user state changes

  const toLogin = () => {
    navigate("/login");
  };
  const logout = () => {
    logoutUser();
    setIsLoggedIn(false); // Update login status
    navigate("/");
  };
  const toSignup = () => {
    navigate("/signup");
  };
  const toHome = () => {
    navigate("/");
  };
  const toAdminPage = () => {
    navigate("/admin");
  };
  const toTicketPage = () => {
    navigate("/tickets");
  };
  return (
    <>
      <nav className="navbar my-navbar">
        <div className="container-fluid">
          <div className="main-nav">
            <div className="nav-1">{/* Your Logo goes here */}</div>
            <div className="nav-2">
              <button className="btn navi-2" onClick={toHome}>
                Home
              </button>
            </div>
            <div className="nav-3">
              {isLoggedIn ? ( // Use isLoggedIn state to determine login status
                <div className="login-btn">
                  {user.is_superuser ? (
                    <button
                      className="btn btn-outline-success admin m-2"
                      onClick={toAdminPage}
                    >
                      Admin Panel
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-success m-2"
                      onClick={toTicketPage}
                    >
                      My Tickets
                    </button>
                  )}
                  <button
                    className="btn btn-outline-success logout-btn m-2"
                    onClick={logout}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="login-btn">
                  <button
                    className="btn btn-outline-success m-2"
                    onClick={toLogin}
                  >
                    Log In
                  </button>
                  <button
                    className="btn btn-outline-success m-2"
                    onClick={toSignup}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
