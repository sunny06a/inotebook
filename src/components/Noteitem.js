import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

export default function Noteitem(props) {
    const context=useContext(noteContext);
    const {deleteNote}= context;
    const {note,updateNote}=props;
  return (
    <div className='col-md-4'>
        <div className="card my-3" style={{width: "18rem"}}>
   <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
  </div>
</div>
    </div>
  )
}
