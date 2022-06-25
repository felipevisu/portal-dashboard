import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";

import "./Richtext.css";

interface RichTextEditorProps {
  name: string;
  editorState: EditorState;
  onChange: ({ name, value }) => void;
}

export const RichTextEditor = ({
  name,
  editorState,
  onChange,
}: RichTextEditorProps) => {
  const handleChange = (value: EditorState) => {
    onChange({ name, value });
  };

  const toggleBlockType = (blockType: string) => {
    onChange({
      name,
      value: RichUtils.toggleBlockType(editorState, blockType),
    });
  };

  const toggleInlineStyle = (blockType: string) => {
    onChange({
      name,
      value: RichUtils.toggleInlineStyle(editorState, blockType),
    });
  };

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div className="RichEditor-editor">
        <Editor editorState={editorState} onChange={handleChange} />
      </div>
    </div>
  );
};

export default RichTextEditor;
