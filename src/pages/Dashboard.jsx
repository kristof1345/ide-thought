import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import File from "../components/File";
import FileLoader from "../components/FileLoader";
import { app, auth, database } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState();
  const [fileNum, setFileNum] = useState(
    JSON.parse(localStorage.getItem("fileNum")) || ""
  );

  useEffect(() => {
    localStorage.setItem("fileNum", JSON.stringify(fileNum));
  }, [fileNum]);

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    if (user) {
      const collectionRef = collection(database, user.uid);
      const docsSnap = await getDocs(collectionRef);

      if (docsSnap) {
        const ret = docsSnap.docs.map((doc) => doc.data());
        setData(ret);
        setFileNum(ret.length);
      } else {
        console.log("docs not returned");
      }
    }
  };

  return (
    <div>
      <SideNav setFileNum={setFileNum} />
      <div className="ml-64 p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7">
        {data
          ? data.map((file, i) => (
              <File file={file} key={i} user={user} setFileNum={setFileNum} />
            ))
          : [...Array(+fileNum).keys()].map((k, i) => <FileLoader key={i} />)}
      </div>
    </div>
  );
};

export default Dashboard;
