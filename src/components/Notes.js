import React, { useContext, useEffect,useRef,useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
export default function Notes() {
    const context=useContext(noteContext);
    const {notes,getNote,editNote}=context;
    const[note,setNote]=useState({id:'',etitle:' ',edescription:'',etag:'default'})
    const handleClick=(e)=>{
      e.preventDefault();
      editNote(note.id,note.etitle,note.edescription,note.etag);
      refClose.current.click();
      // addNote(note.title,note.description,note.tag);
  }
  const onchange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  }
    useEffect(()=>{
      getNote()
    },[])
    const updateNote=(note)=>{
      ref.current.click();
      setNote({id:note._id,etitle:note.title,edescription:note.description,etag:note.tag})
    }
    const ref=useRef(null);
    const refClose=useRef(null);
  return (
    <>
    <Addnote></Addnote>
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
<div className="mb-3">
  <label htmlFor="etitle" className="form-label">Title</label>
  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange}/>
</div>
<div className="mb-3">
  <label htmlFor="edescription" className="form-label">description</label>
  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange}/>
</div>
<div className="mb-3">
  <label htmlFor="etag" className="form-label">tag</label>
  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange}/>
</div>
</form>      
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className='row my-3'>
         <h1>your notes</h1>
      {notes.map((note)=>{
        return <Noteitem key={note._id} note={note} updateNote={updateNote}></Noteitem>
    })}
    </div>
    </>
  )
}
