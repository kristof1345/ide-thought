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
    // let cursorPos = cursorPosition();
    if (matches != null) {
      matches.forEach((value) => {
        // console.log(matches);
        if (elem.hasChildNodes()) {
          // console.log(elem.childNodes);
          // console.log(elem);
          // let children = elem.querySelectorAll(".para");
          // if (matches.length === children.length) {
          removeTime(elem);
          // console.log(value);
          elem.innerHTML = elem.innerHTML.replace(
            "[" + value + "]",
            "<span class='para' data-time='latest'>(" + value + ")</span>&nbsp;"
          );
          setCaret(elem);
          // }
        }
      });
    }
  };

  function removeTime(el) {
    let paras = el.querySelectorAll(".para");

    paras.forEach((para) => {
      para.dataset.time = "notlatest";
    });
  }

  function setCaret(el) {
    let para = el.querySelector('[data-time="latest"]');
    let range = document.createRange();

    // range.selectNodeContents(para);
    const textNode = para.firstChild;
    const offset = 2; // Adjust this value as needed
    range.setStart(textNode, offset);
    range.collapse(false);

    const selection = window.getSelection();

    // Remove any existing selections
    selection.removeAllRanges();

    // Add the new range to the selection
    selection.addRange(range);
  }

  // function cursorPosition() {
  //   var sel = document.getSelection();
  //   sel.modify("extend", "backward", "paragraphboundary");
  //   var pos = sel.toString().length;
  //   if (sel.anchorNode != undefined) sel.collapseToEnd();

  //   return pos;
  // }

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
