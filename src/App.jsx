import { useState } from "react";
import ImageUpload from "./components/FileForm";
import { Toaster } from "react-hot-toast";
import About from "./components/About";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <NavBar />
      <ImageUpload />
      <Toaster />
    </div>
  );
}

export default App;
