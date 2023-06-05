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
      createRichInput(el);
    });
  };

  function createRichInput(original) {
    var newId = "richtext_" + original.getAttribute("id");
    var newElement = '<div class="richtext" id="' + newId + '"></div>';

    newId = "#" + newId;

    var width = original.offsetWidth;
    var height = original.offsetHeight;

    original.insertAdjacentHTML("beforebegin", "<pre></pre>");
    original.outerHTML = newElement + original.outerHTML;

    var newElementRef = document.querySelector(newId);
    newElementRef.style.width = width + "px";
    newElementRef.style.height = height + "px";
    newElementRef.querySelector("pre").style.width = width + "px";
    newElementRef.querySelector("pre").style.height = height + "px";

    original.style.background = "transparent";
    original.style.position = "absolute";
    original.style.zIndex = 100;
    original.style.margin = 0;
    original.style.width = width + "px";
    original.style.border = 0;
    original.style.padding = 0;

    original.addEventListener("propertychange", handleInput);
    original.addEventListener("keyup", handleInput);
    original.addEventListener("input", handleInput);
    original.addEventListener("paste", handleInput);
    original.addEventListener("click", handleInput);

    function handleInput() {
      var text = original.value;
      newElementRef.querySelector("pre").innerHTML = colorize(
        text,
        getCursorPosition(original)
      );
    }
  }

  function colorize(text, pos) {
    var i = 0,
      current_times = 0;
    var startc = "(",
      endc = ")";
    var current = -1;

    var entities = { ">": "&gt;", "<": "&lt;" };
    var p2 = 0;
    var regex = new RegExp(Object.keys(entities).join("|"), "g");
    var converted = text.replace(regex, function (x, j) {
      if (pos > j) p2 += entities[x].length - 1;
      return entities[x];
    });

    pos += p2;
    var parens = [],
      indices = [],
      o = {};
    var newText = converted.replace(
      /((?:\\)*)([()])/g,
      function (full, escape, x, idx) {
        var len = escape.split(/\\/g).length - 1;
        if (len % 2 == 0) {
          indices.push(idx);
          if (x == startc) ++i;
          o[idx] = {
            selected: false,
            type: x,
            depth: i,
            idx: idx,
            pair: -1,
            extra: escape,
          };
          if (idx == pos) o[idx].selected = true;
          if (x == startc) parens.push(idx);
          else {
            if (parens.length > 0) {
              var p = parens.pop();
              o[idx].pair = p;
              if (o[p].selected) o[idx].selected = true;
              o[p].pair = idx;
              if (o[idx].selected) o[p].selected = true;
            }
            --i;
          }
        }
      }
    );
    let newtext = converted;
    indices = indices.sort(function (x, y) {
      return Number(y) - Number(x);
    });
    indices.forEach(function (i) {
      newtext =
        newtext.substr(0, i) +
        o[i].extra +
        "<span class='" +
        (o[i].pair == -1 ? "unmatched " : "paren_" + (o[i].depth % 5)) +
        (o[i].selected ? " selected_paren" : "") +
        "'>" +
        o[i].type +
        "</span>" +
        newtext.substr(i + 1 + o[i].extra.length);
    });
    return newtext;
  }

  function getCursorPosition(input) {
    if (!input) return; // No (input) element found
    if ("selectionStart" in input) {
      // Standard-compliant browsers
      return input.selectionStart;
    } else if (document.selection) {
      // IE
      input.focus();
      var sel = document.selection.createRange();
      var selLen = document.selection.createRange().text.length;
      sel.moveStart("character", -input.value.length);
      return sel.text.length - selLen;
    }
  }

  // const lookForParas = (elem) => {
  //   const text = elem.innerHTML;
  //   let matches = text.match(/[^[]+(?=\])/g);
  //   let cursorPos = cursorPosition();
  //   if (matches != null) {
  //     console.log("huh");
  //     matches.forEach(function (value) {
  //       elem.innerHTML = elem.innerHTML.replace(
  //         "[" + value + "]",
  //         "<span class='para'>[" + value + "]</span>"
  //       );
  //     });
  //     setCaret(elem, cursorPos);
  //   }
  // };

  // function setCaret(el, cursorPos) {
  //   // let el = document.getElementById("editable");
  //   let range = document.createRange();
  //   let sel = window.getSelection();

  //   range.setStart(el, cursorPos);
  //   range.collapse(true);

  //   sel.removeAllRanges();
  //   sel.addRange(range);
  // }

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
