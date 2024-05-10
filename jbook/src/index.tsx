import * as esbuild from "esbuild-wasm";
import React from "react";
import ReactDOM from "react-dom/client";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin.ts";
import { fetchPlugin } from "./plugins/fetch-plugin.ts";

const App = () => {
  const ref = React.useRef<any>(null);
  const iframe = React.useRef<any>(null);
  const [input, setInput] = React.useState("");
  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    await esbuild.initialize({
      worker: false,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.21.1/esbuild.wasm",
    });

    ref.current = true;
  };

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = html;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div> 
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>

      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
