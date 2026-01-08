import { Outlet } from "react-router-dom";
import landing_logo from "/public/landing_logo.jpg";
import auth_logo from "/public/auth_logo.png";
import resgister_logo from "/public/register_logo.png";

function Layout() {
  return (
    <>
      <header className="bg-gradient-to-r from-amber-950 to-amber-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={landing_logo}
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
            <a href="/services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <a href="/favorites" className="hover:text-white transition-colors">
              Favorites
            </a>
          </nav>

          <button
            className="
    flex items-center gap-2
    text-amber-50 font-sans font-medium
    transition-colors hover:text-white cursor-pointer
    [font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','SF Pro Display','Helvetica Neue',Arial,sans-serif]
  "
            onClick={() => {
              alert("Login functionality to be implemented");
            }}
          >
            <img
              src={auth_logo}
              alt="authentication logo"
              className="w-5 h-5 object-contain"
            />
            Login
          </button>

          <button
            className="
    flex items-center gap-2
    text-amber-50 font-sans font-medium
    transition-colors hover:text-white cursor-pointer
    [font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','SF Pro Display','Helvetica Neue',Arial,sans-serif]
  "
            onClick={() => {
              alert("Register functionality to be implemented");
            }}
          >
            <img
              src={resgister_logo}
              alt="registration logo"
              className="w-5 h-5 object-contain"
            />
            Register
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

    </>
  );
}

export default Layout;
