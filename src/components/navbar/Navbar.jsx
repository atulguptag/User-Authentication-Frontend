import "./Navbar.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login");
  };
  const logout = () => {
    logoutUser();
    navigate("/");
  };
  const toSignup = () => {
    navigate("/signup");
  };
  const toHome = () => {
    navigate("/");
  };
  const toAdminPage = () => {
    navigate("/admin-page");
  };
  const toTicketPage = () => {
    navigate("/Tickets");
  };
  return (
    <>
      <nav className="navbar my-navbar">
        <div className="container-fluid">
          <div className="main-nav">
            <div className="nav-1">{/* Your Logo goes here */}</div>
            <div className="nav-2">
              <div className="iconn">
                <FaHome size={30} color="#373e98" onClick={toHome} />
              </div>
            </div>
            <div className="nav-3">
              {user ? (
                <div className="login-btn">
                  {user.is_superuser ? (
                    <button
                      className="btn btn-outline-success admin m-2"
                      type="submit"
                      onClick={toAdminPage}
                    >
                      Admin Panel
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-success m-2"
                      type="submit"
                      onClick={toTicketPage}
                    >
                      My Tickets
                    </button>
                  )}
                  <button
                    className="btn btn-outline-success m-2"
                    type="submit"
                    onClick={logout}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="login-btn">
                  <button
                    className="btn btn-outline-success m-2"
                    type="submit"
                    onClick={toLogin}
                  >
                    Log In
                  </button>
                  <button
                    className="btn btn-outline-success m-2"
                    type="submit"
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
