import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { Editor, OnChange, OnMount } from "@monaco-editor/react";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";
import prettier from "prettier";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import React from "react";
import "./code-editor.css";
import "./syntax.css";

interface CodeEditorProps {
  initialValue?: string;
  value: string;
  onChange(value: string | undefined): void;
}

const babelParse = (code: string) =>
  parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  value,
  onChange,
}) => {
  const editorRef = React.useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    const defaultOptions = {
      parser: "babel", // for reference only, only babel is supported right now
      isHighlightGlyph: false, // if JSX elements should decorate the line number gutter
      iShowHover: false, // if JSX types should  tooltip with their type info
      isUseSeparateElementStyles: false, // if opening elements and closing elements have different styling
      isThrowJSXParseErrors: false, // Only JSX Syntax Errors are not thrown by default when parsing, true will throw like any other parsign error
    };

    const highlightedText = new MonacoJSXHighlighter(
      monaco,
      babelParse,
      traverse,
      editor,
      defaultOptions
    );

    highlightedText.highlightOnDidChangeModelContent(100);
    highlightedText.addJSXCommentCommand();
  };

  const handleEditorChange: OnChange = (value) => {
    onChange(value);
  };

  const onFormatClick = async () => {
    const unformatted = editorRef.current.getValue();
    const formatted = (
      await prettier.format(unformatted, {
        parser: "babel",
        useTabs: false,
        semi: true,
        singleQuote: true,
        plugins: [babelPlugin, estreePlugin],
      })
    ).replace(/\n$/, "");

    onChange(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        defaultValue={initialValue}
        value={value}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
