import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { BiBold, BiItalic, BiUnderline, BiUndo, BiRedo } from "react-icons/bi";
import {
  makeRedo,
  makeUndo,
  makeBold,
  makeItalic,
  makeUnderline,
} from "./Commands";

const ToolBar = ({ localUser, id, setAutoParas, autoParas }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleToggle2 = () => {
    setOpen2(!open2);
  };

  const saveToDB = () => {
    const title = document.getElementById("title");
    const desc = document.getElementById("desc");
    const elem = document.getElementById("content-editor");
    const docToUpdate = doc(database, localUser.uid, id);
    updateDoc(docToUpdate, {
      title: title.textContent,
      desc: desc.textContent,
      content: elem.innerHTML,
    }).catch((err) => console.log(err));
  };

  const getSelectedText = () => {
    if (window.getSelection) {
      return "" + window.getSelection();
    } else if (document.selection && document.selection.type == "Text") {
      return document.selection.createRange().text;
    }
    console.log("shit");
  };

  return (
    <div className="fixed flex items-center justify-between px-5 top-4 mr-4 ml-[272px] left-0 right-0 bg-zinc-100 h-14 z-10 rounded-full">
      <div className="flex text-[1.5rem] divide-x">
        <div className="flex gap-1 pr-1">
          <button
            className="hover:bg-zinc-200 p-[0.35rem] rounded"
            onClick={() => makeUndo()}
          >
            <BiUndo />
          </button>
          <button
            className="hover:bg-zinc-200 p-[0.35rem] rounded"
            onClick={() => makeRedo()}
          >
            <BiRedo />
          </button>
        </div>
        <div className="flex gap-1 pl-1">
          <button
            className="hover:bg-zinc-200 p-[0.35rem] rounded"
            onClick={() => makeBold()}
          >
            <BiBold />
          </button>
          <button
            className="hover:bg-zinc-200 p-[0.35rem] rounded"
            onClick={() => makeItalic()}
          >
            <BiItalic />
          </button>
          <button
            className="hover:bg-zinc-200 p-[0.35rem] rounded"
            onClick={() => makeUnderline()}
          >
            <BiUnderline />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-7">
        <div className="relative">
          <button
            className="bg-zinc-200 hover:bg-zinc-300 px-3 py-1 rounded text-md"
            onClick={() => handleToggle()}
          >
            Text Mutation
          </button>
          {open && (
            <div className="absolute bg-zinc-100 px-0 py-1 rounded shadow-md top-12 min-w-max">
              <div>
                <button className="px-3 py-1 hover:bg-zinc-200 w-full">
                  Paras <span className="text-slate-400 text-sm">ctrl+p</span>
                </button>
              </div>
              <div>
                <button className="px-3 py-1 hover:bg-zinc-200 w-full">
                  Logicals{" "}
                  <span className="text-slate-400 text-sm">ctrl+l</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className="bg-zinc-200 hover:bg-zinc-300 px-3 py-1 rounded text-md"
            onClick={() => handleToggle2()}
          >
            Auto Features
          </button>
          {open2 && (
            <div className="absolute bg-zinc-100 px-3 py-1 rounded shadow-md top-12 min-w-max">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={autoParas}
                  onChange={() => setAutoParas((prev) => !prev)}
                />
                <span className="pb-1">Auto Paras</span>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => saveToDB()}
          className="bg-zinc-200 hover:bg-zinc-300 px-5 py-1 rounded-full text-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ToolBar;
