import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { menuItems } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore";
import { GiCharacter, GiExitDoor } from "react-icons/gi";
import gsap from "gsap";
const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const navbar = useRef(null);
  const [currentScroll, setcurrentScroll] = useState(0);
  const [previousScroll, setpreviousScroll] = useState(0);
  const logOut = useAuthStore((state) => state.logOut);
  const navigate = useNavigate();

  // Animation Logic
  useEffect(() => {
    const handle = () => {
      setcurrentScroll(window.scrollY);
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  });
  useEffect(() => {
    if (!navbar.current) return;
    if (currentScroll > previousScroll) {
      setpreviousScroll(currentScroll);
      gsap.to(navbar.current, {
        y: "-100%",
        duration: 0.2,
        ease:"none",
        opacity: 0,
      });
    } else if (currentScroll < previousScroll) {
      setpreviousScroll(currentScroll);
      gsap.to(navbar.current, {
        y: "0",
        duration: 0.2,
        ease: "none",
        opacity: 1,
      });
    }
  }, [currentScroll]);

  return (
    <nav
      ref={navbar}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-white rounded-lg soft-shadow flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1">
              <div className="w-2 h-2 rounded-full bg-[#38BDF8]"></div>
              <div className="w-2 h-2 rounded-full bg-[#1E293B]"></div>
              <div className="w-2 h-2 rounded-full bg-[#1E293B]"></div>
              <div className="w-2 h-2 rounded-full bg-[#1E293B]"></div>
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">
            MemoStack
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {menuItems.map(({ name, path }, id) => (
            <Link
              key={id}
              to={path}
              className="hover:text-blue-600 transition-colors"
            >
              {name}
            </Link>
          ))}
        </ul>

        {/* Desktop Login / User */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          {user ? (
            <div className="flex items-center gap-3">
              <p className="flex items-center gap-2 text-slate-600">
                <GiCharacter /> <span className="font-semibold">{user.name}</span>
              </p>
              <button
                onClick={() => logOut(navigate)}
                className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-full hover:bg-red-100 transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-600 hover:text-slate-900"
              >
                Sign in
              </Link>
              <Link
                to="/login"
                className="bg-white border border-slate-200 px-5 py-2.5 rounded-full hover:bg-slate-50 transition-colors soft-shadow"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-[2px] bg-slate-800"></span>
          <span className="w-6 h-[2px] bg-slate-800"></span>
          <span className="w-6 h-[2px] bg-slate-800"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-20 left-0 right-0 border-b border-slate-100 bg-white/95 backdrop-blur-md p-6 animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col gap-4">
            {menuItems.map(({ name, path }, id) => (
              <Link
                key={id}
                to={path}
                className="text-lg font-medium text-slate-600"
                onClick={() => setOpen(false)}
              >
                {name}
              </Link>
            ))}
          </ul>

          <div className="mt-8 pt-8 border-t border-slate-100">
            {user ? (
              <div className="flex flex-col gap-4">
                <p className="flex items-center gap-2 text-slate-800 font-semibold">
                  <GiCharacter /> {user.name}
                </p>
                <button
                  onClick={() => {
                    logOut(navigate);
                    setOpen(false);
                  }}
                  className="w-fit bg-red-50 text-red-600 border border-red-100 px-6 py-2.5 rounded-full"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 text-center">
                <Link
                  to="/login"
                  className="text-slate-600 font-medium py-2"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
