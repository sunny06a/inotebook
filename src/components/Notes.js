import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
export default function Notes() {
    const context=useContext(noteContext);
    const {notes,addNote}=context;
  
  return (
    <>
    <Addnote></Addnote>
    <div className='row my-3'>
         <h1>your notes</h1>
      {notes.map((note)=>{
        return <Noteitem key={note._id} note={note}></Noteitem>
    })}
    </div>
    </>
  )
}
