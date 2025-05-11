import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopNavbar from "./components/TopNavbar";
import Banner from "./components/Banner";

function App() {
  return (
    <div className="max-w-[1920px] mx-auto">
      <TopNavbar></TopNavbar>
      <Navbar></Navbar>
      <Banner></Banner>
      
    </div>
  );
}

export default App;
