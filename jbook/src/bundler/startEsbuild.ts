import * as esbuild from "esbuild-wasm";

const startEsbuild = async () => {
  return await esbuild.initialize({
    worker: false,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.21.1/esbuild.wasm",
  });
};

export default startEsbuild;
