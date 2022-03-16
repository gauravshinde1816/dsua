import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/layout/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container-fluid">
        <Outlet/>
      </div>
      
    </div>
  );
}

export default App;
