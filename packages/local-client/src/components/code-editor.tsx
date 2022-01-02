import './code-editor.css';
import './syntax.css';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { FC, useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
// import codeShift from 'jscodeshift';
// import Highlighter from 'monaco-jsx-highlighter';
// import { parse } from '@babel/parser';
// import traverse from '@babel/traverse';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string | undefined): void;
}

// const babelParse = (code: any) =>
//   parse(code, {
//     sourceType: 'module',
//     plugins: ['jsx']
//   });

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  const onMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    /* not working well enough */
    // const highlighter = new Highlighter(
    //   // @ts-ignore
    //   window.monaco,
    //   babelParse,
    //   traverse,
    //   // codeShift,
    //   editor,
    //   {
    //     // parser: 'babel', // for reference only, only babel is supported right now
    //     // isHighlightGlyph: false, // if JSX elements should decorate the line number gutter
    //     // iShowHover: false, // if JSX types should  tooltip with their type info
    //     // isUseSeparateElementStyles: false, // if opening elements and closing elements have different styling
    //     // isThrowJSXParseErrors: false // Only JSX Syntax Errors are not thrown by default when parsing, true will throw like any other parsign error
    //   }
    // );
    // highlighter.highLightOnDidChangeModelContent(150);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={onMount}
        onChange={onChange}
        value={initialValue}
        language="javascript"
        theme="vs-dark"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2
        }}
      />
    </div>
  );
};

export default CodeEditor;
