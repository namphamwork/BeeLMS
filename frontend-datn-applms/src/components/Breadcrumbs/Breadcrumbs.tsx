import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { MainRouter } from "../../router";
import "./Breadcrumbs.styles.css";
export const BreadcrumbComponent: React.FC = () => {
  const breadcrumbs = useBreadcrumbs(MainRouter, { disableDefaults: true });

  return (
    <nav className="flex py-4 bg-white rounded-lg shadow-md border border-gray-200 my-4 px-2">
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <div key={index} className="flex items-center ">
          <Link
            to={match.pathname as string}
            className={`${match.pathname === location.pathname
              ? "text-gray-800 font-semibold"
              : "text-gray-500 hover:text-gray-700"
              } transition-colors duration-300 mx-2`}
          >
            {breadcrumb}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <span className="text-gray-400 mx-2">/</span>
          )}
        </div>
      ))}
    </nav>
  );
};
