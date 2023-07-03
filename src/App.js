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
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const[alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    }
    )
    setTimeout(() => {setAlert(null)
    }, 900);
  }
  return (
  <div>
    <NoteState>
      <BrowserRouter>
        <Navbar></Navbar>
      <Alert alert={alert}></Alert>
      <div className='container'>
      <Routes>
        <Route exact path='/' element={<Home showAlert={showAlert}></Home>}></Route>
      </Routes>
      <Routes>
        <Route exact path='/about' element={<About></About>}></Route>
      </Routes>
      <Routes>
        <Route exact path='/login' element={<Login showAlert={showAlert}></Login>}></Route>
      </Routes>
      <Routes>
        <Route exact path='/signup' element={<Signup showAlert={showAlert}></Signup>}></Route>
      </Routes>
     
      </div>
      </BrowserRouter>
      </NoteState>
        
  </div>
  );
}

export default App;
