import "./Navbar.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(user !== null);
  }, [user]); // Re-run effect whenever user state changes

  useEffect(() => {
    const tokenStorage = localStorage.getItem("authTokens");
    if (tokenStorage === 200) {
      setIsLoggedIn(true);
    }
  },[])  

  const toLogin = () => {
    navigate("/login");
  };
  const logout = () => {
    logoutUser();
    window.location.reload();
    setIsLoggedIn(false); 
    navigate("/");
  };
  const toSignup = () => {
    navigate("/signup");
  };
  const toHome = () => {
    navigate("/");
  };
  // const toAdminPage = () => {
  //   navigate("/admin");
  // };
  const toTicketPage = () => {
    navigate("/tickets");
  };
  return (
    <div className="site-header-row-container-inner">
      <div className="my-navbar">
        <div className="container-fluid">
          <div className="main-nav">
            <div className="nav-1">{/* Your Logo goes here */}</div>
            <div className="nav-2">
              <button className="btn home-nav" onClick={toHome}>
                Home
              </button>
            </div>
            <div className="nav-3">
              {isLoggedIn ? ( // Use isLoggedIn state to determine login status
                <div className="login-btn">
                  {(
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
      </div>
    </div>
  );
};

export default Navbar;
