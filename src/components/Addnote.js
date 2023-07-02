import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';


export default function Addnote() {

    const context=useContext(noteContext);
    const {addNote}=context;
    const[note,setNote]=useState({title:' ',description:'',tag:' '})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:' ',description:'',tag:''})
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
    <div className='container my-3'>
    <h1>Add a Note</h1>
    <form className='my-3'>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" value={note.title}name="title" aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">description</label>
  <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onchange} minLength={5} required/>
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">tag</label>
  <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onchange} minLength={5} required/>
</div>

<button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
</form>      
    </div>
  )
}
