import React, { useState, useEffect } from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../components/styles/RichTextEditorCss.css";

//https://jpuri.github.io/react-draft-wysiwyg/#/docs
//https://blog.logrocket.com/build-rich-text-editors-react-draft-js-react-draft-wysiwyg/

function RichTextEditor({ description, setDescription }) {
  //RENDER RICH TEXT EDITOR VS VALUE FROM API
  let [blocks, setBlocks] = useState(convertFromHTML(description || ""));
  let [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(blocks.contentBlocks, blocks.entityMap)
    )
  );
  useEffect(() => {
    if (description) {
      setBlocks(convertFromHTML(description));
    }
  }, [description]);
  useEffect(() => {
    setEditorState(() =>
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          blocks.contentBlocks,
          blocks.entityMap
        )
      )
    );
  }, [blocks]);

  //SAVE DATA DESCRIPTION
  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setDescription(html);
  }, [editorState]);

  return (
    <div className="px-4">
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbar={{
          // options: ["bold", "italic", "underline", "history"],
          options: ["inline", "list", "blockType", "history"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
          list: {
            options: ["unordered", "ordered"],
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
          },
        }}
      />
    </div>
  );
}

export default RichTextEditor;
