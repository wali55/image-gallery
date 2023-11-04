import images from "./db.json";
import "./App.css";

function App() {
  const renderedImage = images.map((image) => {
    return (
      <div key={image.id}>
        <img src={image.img} alt="image" />
      </div>
    )
  })

  return (
    <>
      {renderedImage}
    </>
  );
}

export default App;
