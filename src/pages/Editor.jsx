import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { app, auth, database } from "../firebaseConfig";
import EditorComp from "../components/EditorComp";
import ToolBar from "../components/ToolBar";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Editor = () => {
  let { id } = useParams();
  const [localUser, setLocalUser] = useState();
  const [file, setFile] = useState({});
  const [autoParas, setAutoParas] = useState(false);

  const updateDB = async (user) => {
    const docCollection = await getCollection(user);
    if (!docCollection.includes(id)) {
      setDefault(user);
    }
  };

  const getCollection = async (user) => {
    const collectionRef = collection(database, user.uid);
    const docsSnap = await getDocs(collectionRef);

    if (docsSnap) {
      // console.log(docsSnap.docs.map((doc) => doc.id));
      return docsSnap.docs.map((doc) => doc.id);
    } else {
      console.log("docs not returned");
    }
  };

  const getFile = (user) => {
    getDoc(doc(database, user.uid, id))
      .then((res) => {
        setFile(res.data());
      })
      .catch((err) => console.log(err));
  };

  const setDefault = async (user) => {
    await setDoc(doc(database, user.uid, id), {
      title: "Untitled",
      desc: "Add a short description",
      content: "<span class='editable-content' id='test'>Add Text</span>",
      docID: id,
    }).catch((err) => {
      alert(err.message);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateDB(user);
        getFile(user);
        setLocalUser(user);
      } else {
        console.log("shit");
      }
    });
  }, []);

  return (
    <div>
      <SideNav id={id} />
      <ToolBar
        localUser={localUser}
        id={id}
        setAutoParas={setAutoParas}
        autoParas={autoParas}
      />
      <div id="editor" className="ml-64 px-32 py-24">
        {/* <button onClick={() => get()}>get</button> */}
        <div
          className="title font-bold text-5xl mb-4 focus:outline-none overflow-visible w-full rounded px-2 py-1"
          contentEditable="true"
          id="title"
          suppressContentEditableWarning={true}
        >
          {file.title ? (
            file.title
          ) : (
            <div className="h-12 bg-gray-200 rounded-full w-80 mb-5 animate-pulse"></div>
          )}
        </div>
        <div
          className="mb-[0.85rem] text-2xl font-semibold focus:outline-none overflow-visible text-zinc-500 rounded px-2 py-1"
          contentEditable="true"
          id="desc"
          suppressContentEditableWarning={true}
        >
          {file.desc ? (
            file.desc
          ) : (
            <div className="h-8 bg-gray-200 rounded-full w-80 mb-4 animate-pulse"></div>
          )}
        </div>
        <div className="relative text-lg rounded">
          {file.content ? (
            <EditorComp content={file.content} autoParas={autoParas} />
          ) : null}
          {file.content ? null : (
            <div className="animate-pulse absolute top-0 w-full">
              <div className="h-4 bg-gray-200 rounded-full max-w-[500px] mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full max-w-[450px] mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full max-w-[430px] mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full max-w-[460px] mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full max-w-[450px] mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full max-w-[460px] mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full max-w-[490px] mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full max-w-[550px] mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-full max-w-[470px] mb-4"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
