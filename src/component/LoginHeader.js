import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/favicon/rentrix-logo (2).png";

export default function LoginHeader({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="headerLogin-container">
      <div className="flex justify-center">
        <Link to='/'>
          <img src={logo} alt="logo_header" />
        </Link>
      </div>
      <p className="text-center text-2xl font-normal text-gray-900">
        {heading}
      </p>
      <p className="text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <a
          to={linkUrl}
          className="font-bold text-xl text-purple-600 hover:text-purple-500 hover:underline 1px"
        >
          {linkName}
        </a>
      </p>
    </div>
  );
}
