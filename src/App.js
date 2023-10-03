import './App.css';
import ImageForm from './conponents/Firebase/ImageHandler';
import LoadImageUrls from "./conponents/Firebase/ViewImages";

function App() {
  return (
    <div className="App">
      <ImageForm></ImageForm>
      <LoadImageUrls folderName="images"></LoadImageUrls>
    </div>
  );
}

export default App;
