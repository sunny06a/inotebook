import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';

import{
  BrowserRouter ,
  Route,
  Routes
} from "react-router-dom"
import NoteState from './context/notes/NoteState';

function App() {
  return (
  <div>
    <NoteState>
      <BrowserRouter>
        <Navbar></Navbar>
      <div className='container'>
      <Routes>
        <Route exact path='/' element={<Home></Home>}></Route>
      </Routes>
      <Routes>
        <Route exact path='/about' element={<About></About>}></Route>
      </Routes>
      </div>
      </BrowserRouter>
      </NoteState>
        
  </div>
  );
}

export default App;
