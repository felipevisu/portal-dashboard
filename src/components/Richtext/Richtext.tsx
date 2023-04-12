import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";
import { RichtextRoot } from "./styles";

import "./Richtext.css";

interface RichTextEditorProps {
  name: string;
  editorState: EditorState;
  onChange: (e: any) => void;
}

export const RichTextEditor = ({
  name,
  editorState,
  onChange,
}: RichTextEditorProps) => {
  const handleChange = (value: EditorState) => {
    onChange({ target: { name, value } });
  };

  const toggleBlockType = (blockType: string) => {
    onChange({
      target: {
        name,
        value: RichUtils.toggleBlockType(editorState, blockType),
      },
    });
  };

  const toggleInlineStyle = (blockType: string) => {
    onChange({
      target: {
        name,
        value: RichUtils.toggleInlineStyle(editorState, blockType),
      },
    });
  };

  return (
    <RichtextRoot>
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
    </RichtextRoot>
  );
};

export default RichTextEditor;
