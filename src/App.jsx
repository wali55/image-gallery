import "./App.css";
import images from "./db.json";
import { useState, useRef } from "react";

function App() {
  const [pictures, setPictures] = useState(images);
  const [checked, setChecked] = useState(false);

  const dragPicture = useRef(0);
  const draggedOverPicture = useRef(0);

  const handleSort = () => {
    const picturesClone = [...pictures];
    const temp = picturesClone[dragPicture.current];
    picturesClone[dragPicture.current] = picturesClone[draggedOverPicture.current];
    picturesClone[draggedOverPicture.current] = temp;
    setPictures(picturesClone);
  }

  // const handleDelete = () => {
  //   if (checked) {
  //     const newPictures = [...pictures];
  //     const changedPictures = newPictures.map((picture) => picture.showImage = false);
  //     setPictures(changedPictures);
  //   }
  // }

  const handleDelete = () => {
      const newPictures = pictures.map((picture) => {
        if (checked) {
          return { ...picture, showImage: false };
        } else {
          return picture;
        }
      });
      setPictures(newPictures);
    }

  const renderedImage = pictures.map((picture, index) => {
    if (picture.showImage) {
      return (
        <div
          className="border rounded-md cursor-pointer"
          key={picture.id}
          draggable
          onDragStart={() => (dragPicture.current = index)}
          onDragEnter={() => (draggedOverPicture.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <img src={picture.img} className="rounded-md" alt="images" />
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gray-700 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-20 rounded-md"></div>
            <input
              type="checkbox"
              className="checked:bg-blue-500 absolute left-3 top-3 h-4 w-4"
              onClick={() => setChecked(!checked)}
            />
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2">
        {renderedImage}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}

export default App;