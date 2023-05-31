import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../firebaseConfig";

const File = ({ file, user, setFileNum }) => {
  const [drop, setDrop] = useState(false);
  const [deleted, setDeleted] = useState("");

  const deleteFile = async () => {
    const docRef = doc(database, user.uid, file.docID);
    await deleteDoc(docRef);
    setDeleted("hidden");
    setFileNum((prev) => prev - 1);
  };

  return (
    <div
      className={`bg-gray-100 hover:bg-gray-200 px-6 py-5 rounded-md relative ${deleted}`}
    >
      <button
        type="button"
        onClick={() => setDrop((prev) => !prev)}
        className="absolute top-1 right-1 text-lg bg-transparent hover:bg-gray-300 rounded-full p-2 z-20"
      >
        <BsThreeDots />
      </button>
      {drop && (
        <div className="z-10 absolute right-3 top-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {/* <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li> */}
            <li>
              <span
                onClick={() => deleteFile()}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </span>
            </li>
          </ul>
        </div>
      )}
      <Link to={`/${file.docID}`}>
        <h2 className="text-2xl font-medium truncate">{file.title}</h2>
        <p className="text-base truncate">
          {file.desc === "" ? "No Description" : file.desc}
        </p>
      </Link>
    </div>
  );
};

export default File;
