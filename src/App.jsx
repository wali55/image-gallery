import "./App.css";
import images from "./db.json";
import { useState, useRef } from "react";

function App() {
  const [pictures, setPictures] = useState(images);
  const [checked, setChecked] = useState([]);

  const dragPicture = useRef(0);
  const draggedOverPicture = useRef(0);

  const handleSort = () => {
    const picturesClone = [...pictures];
    const temp = picturesClone[dragPicture.current];
    picturesClone[dragPicture.current] =
    picturesClone[draggedOverPicture.current];
    picturesClone[draggedOverPicture.current] = temp;
    setPictures(picturesClone);
  };

  let newArr = [];
  const handleCheck = (id) => {
    const delPics = pictures.find((picture) => picture.id === id);
    newArr.push(delPics);
    newArr = [...checked, ...newArr];
    setChecked(newArr);
  };

  const handleDelete = () => {
    checked.map((pic) => (pic.showImage = false));
    setPictures([...pictures, ...checked]);
  };

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
              onClick={() => handleCheck(picture.id)}
            />
          </div>
        </div>
      );
    }
  });

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">Image Gallery</h2>
        <button
          className="hover:bg-red-500 text-white bg-red-600 border-0"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2">
        {renderedImage}
      </div>
    </>
  );
}

export default App;
