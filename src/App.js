import "./App.css";
import { useEffect, useState } from "react";
import { marked } from "marked";
import { defaultEditorText } from "./exampleText";

function App() {
  const [editorText, setEditorText] = useState(defaultEditorText);
  const [previewOutput, setpreviewOutput] = useState("previewOutput-0");

  // marked library settings to comply with requirements
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  //f to update Previewer
  const handleEditorChange = () => {
    // rtranslate text to html with external library
    const translatedText = marked(editorText, { sanitize: true });
    // setpreviewOutput

    setpreviewOutput(translatedText);
  };

  // efect to update Previewer whenever editor is changed; callback avoids state being one step behind
  useEffect(() => {
    handleEditorChange();
  }, [editorText]);

  //useEffect(handleEditorChange, []);

  return (
    <>
      <header>GFM to HTML</header>
      <main>
        <article>
          <h3>Editor</h3>
          <textarea
            autoFocus
            id="editor"
            name="editor"
            cols={50}
            rows={30}
            value={editorText} // input value forced to be the state variable
            onChange={(changeEvent) => setEditorText(changeEvent.target.value)} // execute when value is modified by user typing in the textarea
          ></textarea>
        </article>
        <article>
          <h3>Previewer</h3>
          <div
            id="preview"
            dangerouslySetInnerHTML={{ __html: previewOutput }}
          ></div>
        </article>
      </main>
      <footer>Gonzalo M.G.</footer>
    </>
  );
}

export default App;
