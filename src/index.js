// react
import { createRoot } from "react-dom/client";
// my modules
import { ImageUploader } from "./image-uploader";
//import { Confirm } from "./confirm";

const root = createRoot(document.getElementById('container'))
root.render(<ImageUploader/>)

/*
Confirm(
    'fa-triangle-exclamation', // icon
    'Action sensible', // title
    'Voulez vous vraiment continuer cet action ?', // text
    'Annuler', // button 1
    null, // function 1
    'Continuer', // button 2
    () => {alert('Vous avez continué l\'action')} // function 2
)
*/
