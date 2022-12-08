import Navbaar from "./components/Navbaar";
import Search from "./components/Search";
import Pnr from "./components/Pnr";
import Footer from "./components/Footer";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="parent">
    <Navbaar/>
    <Routes>
      <Route path='/' element={<Search/>}/>
      <Route path='/Pnr-Status' element={<Pnr/>}/>
    </Routes>
    <Footer/>
    </div>

  );
}

export default App;
