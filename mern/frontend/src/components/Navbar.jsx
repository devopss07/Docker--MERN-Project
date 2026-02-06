import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    /* CHANGED: Main container is now sticky with a blurred white background */
    <div className="sticky top-0 z-40 w-full backdrop-blur-flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white/80 supports-backdrop-blur:bg-white/60 pb-4 pt-4 mb-6">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-3">
          <img alt="MongoDB logo" className="h-8 inline" src="https://raw.githubusercontent.com/mongodb-developer/mern-stack-example/603144e25ba5549159d1962601337652a7bfa253/mern/client/src/assets/mongodb.svg"></img>
          {/* ADDED: Application Title */}
          <span className="font-bold text-slate-800 text-lg hidden sm:block">HR Portal</span>
        </NavLink>

        {/* CHANGED: Updated button styling to be a distinct primary color (Indigo) with a shadow */}
        <NavLink className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-6 shadow-sm hover:shadow-md" to="/create">
          + Add Employee
        </NavLink>
      </nav>
    </div>
  );
}