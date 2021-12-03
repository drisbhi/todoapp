import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="col-md-12 bg-dark py-2">
      <nav className="navbar bg-dark navbar-dark  ">
        <Link to={"/"} className="navbar-brand ">
          TO DO LIST APP
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
