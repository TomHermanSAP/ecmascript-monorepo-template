const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");
const { BackendMock } = require("./backend-mock");

const editorFilePath = resolve(__dirname, "./person-details.json");
const editorFileText = readFileSync(editorFilePath, "utf-8");
let editorFileObject = JSON.parse(editorFileText);

new BackendMock({
  onFrontendReady: async () => {
    return editorFileObject;
  },
  save: async (newEditorFileObject) => {
    writeFileSync(
      editorFilePath,
      JSON.stringify(newEditorFileObject, null, 2),
      "utf-8"
    );
    editorFileObject = newEditorFileObject;
  },
});
