import React from "react";
import { MdOutlineAddCircle, MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SideNav = ({ id, setFileNum }) => {
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {!id && (
              <li className="pb-4 border border-b-1 border-r-0 border-l-0 border-t-0 border-gray-600">
                <Link
                  to={`/${uuidv4()}`}
                  className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <MdOutlineAddCircle className="text-xl" />
                  <span
                    onClick={() => setFileNum((prev) => prev + 1)}
                    className="ml-3"
                  >
                    New
                  </span>
                </Link>
              </li>
            )}
            {id && (
              <li>
                <Link
                  to={`/`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <MdOutlineDashboard className="text-xl" />
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </aside>
      <Link
        className="sm:hidden bg-zinc-100 rounded bitch"
        to={id ? "/" : `/${uuidv4()}`}
      >
        {id ? (
          "Dashboard"
        ) : (
          <span onClick={() => setFileNum((prev) => prev + 1)}>New</span>
        )}
      </Link>
    </>
  );
};

export default SideNav;
