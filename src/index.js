// react
import { createRoot } from "react-dom/client";
// my modules
import { ImageUploader } from "./image-uploader";

const root = createRoot(document.getElementById('container'))
root.render(<ImageUploader/>)