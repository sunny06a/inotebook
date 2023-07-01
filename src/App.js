import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';

import{
  BrowserRouter ,
  Route,
  Routes
} from "react-router-dom"

function App() {
  return (
  <div>
    <BrowserRouter>
        <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
      </Routes>
      <Routes>
        <Route exact path='/about' element={<About></About>}></Route>
      </Routes>
      </BrowserRouter>
        
  </div>
  );
}

export default App;
