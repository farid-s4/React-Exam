import { Outlet } from "react-router-dom";
import landing_logo from "/public/landing_logo.jpg";
import auth_logo from "/public/auth_logo.png";
function Layout() {
  return (
    <>
      <header className="bg-gradient-to-r from-amber-900 to-amber-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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

          <nav className="hidden md:flex gap-8 uppercase tracking-wider text-amber-50 font-serif hover:cursor-pointer items-center font-bold">
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
            className="text-white
          transition-colors hover:cursor-pointer"
            onClick={() => {
              alert("Login functionality to be implemented");
            }}
          >
            <img
              src={auth_logo}
              alt="aunthentication logo"
              className="w-8 h-8 object-contain"
            />
            Login
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>© 2026</footer>
    </>
  );
}

export default Layout;
