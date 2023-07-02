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
import Login from './components/Login';
import Signup from './components/Signup';

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
      <Routes>
        <Route exact path='/login' element={<Login></Login>}></Route>
      </Routes>
      <Routes>
        <Route exact path='/signup' element={<Signup></Signup>}></Route>
      </Routes>
     
      </div>
      </BrowserRouter>
      </NoteState>
        
  </div>
  );
}

export default App;
