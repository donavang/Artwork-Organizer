import { useState } from "react";
import { ref, uploadBytes, getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import FirebaseConfig from "../../FirebaseConfig.js";

const app = initializeApp(FirebaseConfig);
const storage = getStorage(app);
const store = getFirestore(app);

function ImageForm() {
  const [imageUpload, setImageUpload] = useState(null);

  async function uploadFile (event) {
    // event.preventDefault();

    //uploads file to firebase storage
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${event.target.name.value}`);
    uploadBytes(imageRef, imageUpload);

    //adds document with image name with image information
    await setDoc(doc(store, "images", event.target.name.value), {
        name: event.target.name.value,
        author: event.target.author.value,
        filePath: `${ref(storage, `images/${event.target.name.value}`)}`
    });
  };

  return (
    <div className="App">
        <form onSubmit={uploadFile}>
            <p>Name: <input name="name"></input></p>
            <p>Author: <input name="author"></input></p>
            <input
                type="file"
                onChange={(event) => {
                setImageUpload(event.target.files[0]);
                }}
            />
            <button type="submit"> Upload Image</button>
        </form>
      
      
    </div>
  );
}

export default ImageForm;