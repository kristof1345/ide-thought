import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const EditorComp = ({ content }) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(content);
  }, [html]);

  const addEvents = () => {
    const elems = document.querySelectorAll(".editable-content");
    elems.forEach((el) => {
      lookForParas(el);
    });
  };

  const lookForParas = (elem) => {
    const text = elem.innerHTML;
    let matches = text.match(/[^[]+(?=\])/g);
    let cursorPos = cursorPosition();
    if (matches != null) {
      console.log("huh");
      matches.forEach(function (value) {
        elem.innerHTML = elem.innerHTML.replace(
          "[" + value + "]",
          "<span class='para'>[" + value + "]</span>"
        );
      });
      setCaret(elem, cursorPos);
    }
  };

  function setCaret(el, cursorPos) {
    // let el = document.getElementById("editable");
    let range = document.createRange();
    let sel = window.getSelection();

    range.setStart(el, cursorPos);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  function cursorPosition() {
    var sel = document.getSelection();
    sel.modify("extend", "backward", "paragraphboundary");
    var pos = sel.toString().length;
    if (sel.anchorNode != undefined) sel.collapseToEnd();

    return pos;
  }

  return (
    <>
      <div
        id="content-editor"
        contentEditable="true"
        className="focus:outline-none"
        suppressContentEditableWarning={true}
        onInput={() => addEvents()}
      >
        {parse(html)}
      </div>
    </>
  );
};

export default EditorComp;
