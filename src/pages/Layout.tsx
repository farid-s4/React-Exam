import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AppContext";
function Layout() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  return (
    <>
      <header
        className=" fixed top-0 w-full z-50
  backdrop-blur-md
  bg-gradient-to-r from-amber-950/70 to-amber-800/50
  shadow-lg shadow-black/40
  border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="../public/landing_logo.jpg"
              alt="ZR Performance Logo"
              className="w-11 h-11 object-contain"
            />
            <span className="text-white text-xl font-semibold tracking-wide">
              ZR <span className="font-light">Performance</span>
            </span>
          </div>

          <nav
            className="hidden md:flex gap-8 uppercase tracking-wider text-amber-50
  font-sans font-semibold items-center cursor-pointer
  [font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','SF Pro Display','Helvetica Neue',Arial,sans-serif]"
          >
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <a className="hover:text-white transition-colors" onClick={() => navigate("/basket")}>
              Basket
            </a>
            <a className="hover:text-white transition-colors" onClick={() => navigate("/favorite")}>
              Favorites
            </a>
          </nav>

          {!isAuthenticated && (
            <button
              className="
    flex items-center gap-2
    text-amber-50 font-sans font-medium
    transition-colors hover:text-white cursor-pointer
    [font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','SF Pro Display','Helvetica Neue',Arial,sans-serif]
  "
              onClick={() => {
                navigate("/login");
              }}
            >
              <img
                src="../public/auth_logo.png"
                alt="authentication logo"
                className="w-5 h-5 object-contain"
              />
              Login
            </button>
          )}
          {!isAuthenticated && (
            <button
              className="
    flex items-center gap-2
    text-amber-50 font-sans font-medium
    transition-colors hover:text-white cursor-pointer
    [font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','SF Pro Display','Helvetica Neue',Arial,sans-serif]
  "
              onClick={() => {
                navigate("/register");
              }}
            >
              <img
                src="../public/register_logo.png"
                alt="registration logo"
                className="w-5 h-5 object-contain"
              />
              Register
            </button>
          )}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="flex items-center gap-2
    text-amber-50 font-sans font-medium
    transition-colors hover:text-white cursor-pointer
    [font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','SF Pro Display','Helvetica Neue',Arial,sans-serif]"
            >
              {user?.name}: Logout
              <img
                src="../public/logout_logo.png"
                alt="logout logo"
                className="w-5 h-5 object-contain"
              />
            </button>
          )}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
