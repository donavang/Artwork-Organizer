import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, listAll } from "firebase/storage";
import FirebaseConfig from "../../FirebaseConfig.js";

const app = initializeApp(FirebaseConfig);
const storage = getStorage(app);

function LoadImageUrls(props){
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        listAll(ref(storage, props.folderName)).then((response) => {
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
            });
        });
        });
    }, []);

    return (
        imageUrls.map((url) => {
            return <img src={url}/>
        })
    );

   
}

export default LoadImageUrls;

