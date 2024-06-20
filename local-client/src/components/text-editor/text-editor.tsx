import MarkdownEditor from "@uiw/react-markdown-editor";
import React from "react";
import { useActions } from "../../hooks";
import { Cell } from "../../state";
import "./text-editor.css";

interface TextEditorProps {
  cell: Cell;
}

export const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = React.useState(false);
  const { updateCell } = useActions();

  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} data-color-mode="dark" className="text-editor">
        <MarkdownEditor
          height="200px"
          value={cell.content}
          visible={true}
          onChange={(value, viewUpdate) => updateCell(cell.id, value ?? "")}
        />
      </div>
    );
  }

  return (
    <div
      data-color-mode="dark"
      onClick={() => setEditing(true)}
      className="text-editor card"
    >
      <div className="card-content">
        <MarkdownEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </div>
  );
};
