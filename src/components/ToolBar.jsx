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
  const [open3, setOpen3] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleToggle2 = () => {
    setOpen2(!open2);
  };
  const handleToggle3 = () => {
    setOpen3(!open3);
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

  const bigText = () => {
    var sel = window.getSelection(); // Gets selection
    if (sel.rangeCount) {
      // Creates a new element, and insert the selected text with the chosen font inside
      var e = document.createElement("span");
      e.style = "font-size: 2rem; line-height: 2rem";
      e.innerHTML = sel.toString();

      // https://developer.mozilla.org/en-US/docs/Web/API/Selection/getRangeAt
      var range = sel.getRangeAt(0);
      range.deleteContents(); // Deletes selected text…
      range.insertNode(e); // … and inserts the new element at its place
    }
  };

  const midText = () => {
    var sel = window.getSelection(); // Gets selection
    if (sel.rangeCount) {
      // Creates a new element, and insert the selected text with the chosen font inside
      var e = document.createElement("span");
      e.style = "font-size: 1.55rem; line-height: 1.85";
      e.innerHTML = sel.toString();

      // https://developer.mozilla.org/en-US/docs/Web/API/Selection/getRangeAt
      var range = sel.getRangeAt(0);
      range.deleteContents(); // Deletes selected text…
      range.insertNode(e); // … and inserts the new element at its place
    }
  };

  const normalText = () => {
    var sel = window.getSelection(); // Gets selection
    if (sel.rangeCount) {
      // Creates a new element, and insert the selected text with the chosen font inside
      var e = document.createElement("span");
      e.style = "font-size: 1.125rem; line-height: 1.75rem;";
      e.innerHTML = sel.toString();

      // https://developer.mozilla.org/en-US/docs/Web/API/Selection/getRangeAt
      var range = sel.getRangeAt(0);
      range.deleteContents(); // Deletes selected text…
      range.insertNode(e); // … and inserts the new element at its place
    }
  };

  return (
    <div className="fixed flex items-center justify-between px-5 top-12 sm:top-4 mr-0 sm:mr-4 sm:ml-[272px] left-0 right-0 bg-zinc-100 h-14 z-10 rounded-full">
      <div className="flex text-[1.3rem] sm:text-[1.5rem] divide-x">
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
      <div className="flex items-center gap-1 sm:gap-7">
        <div className="relative">
          <button
            className="bg-zinc-200 hover:bg-zinc-300 px-3 py-1 rounded text-sm sm:text-base"
            onClick={() => handleToggle3()}
          >
            Font Size
          </button>
          {open3 && (
            <div className="absolute bg-zinc-100 px-0 py-1 rounded shadow-md top-12 min-w-max">
              <div>
                <button
                  className="px-3 py-1 hover:bg-zinc-200 w-full"
                  onClick={() => normalText()}
                >
                  Normal
                </button>
              </div>
              <div>
                <button
                  className="px-3 py-1 hover:bg-zinc-200 w-full"
                  onClick={() => midText()}
                >
                  Medium
                </button>
              </div>
              <div>
                <button
                  className="px-3 py-1 hover:bg-zinc-200 w-full"
                  onClick={() => bigText()}
                >
                  Big
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative hidden sm:hidden md:hidden lg:block">
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
        <div className="relative hidden sm:hidden md:hidden lg:block">
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
          className="bg-zinc-200 hover:bg-zinc-300 px-5 py-1 rounded-full text-base sm:text-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ToolBar;
