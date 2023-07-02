import React, { useState } from 'react';
import NoteContext from './NoteContext';
import { json } from 'react-router-dom';

const NoteState=(props)=>{
  const host="http://localhost:5000/"
  const noteinital=[
    {
      "_id": "64a03016859363feb244540c",
      "user": "64a01f5af07c33b461925232",
      "title": "my title is ",
      "description": "hfsifgywgfifhiuhfwuifwf",
      "tag": "personal",
      "date": "2023-07-01T13:54:30.716Z",
      "__v": 0
    },
    {
      "_id": "64a03017859363feb244540e",
      "user": "64a01f5af07c33b461925232",
      "title": "my title is ",
      "description": "hfsifgywgfifhiuhfwuifwf",
      "tag": "personal",
      "date": "2023-07-01T13:54:31.073Z",
      "__v": 0
    }
  ]
  const [notes,setNotes]=useState(noteinital);

  //get a note
  const getNote=async ()=>{
    const response=await fetch('http://localhost:5000/api/notes/fetchnotes',{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
'auth_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhMDFmNWFmMDdjMzNiNDYxOTI1MjMyIn0sImlhdCI6MTY4ODIxNTUyMn0.-vCx6CF-Ev2NRUCoJY2JO0e9kE-KfzJnEfqGRKTa3sA'
      }
      });
      const json= await response.json();
      // console.log(json)
      setNotes(json)
  }


  //add a note
  const addNote=async (title,description,tag)=>{
    const response=await fetch(`${host}api/notes/addnote`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhMDFmNWFmMDdjMzNiNDYxOTI1MjMyIn0sImlhdCI6MTY4ODIxNTUyMn0.-vCx6CF-Ev2NRUCoJY2JO0e9kE-KfzJnEfqGRKTa3sA'
      },
      body:JSON.stringify({title,description,tag})
    });
    const note= await response.json();
    setNotes(notes.concat(note))
    // const note=json;
  }
  //edit a note
  const editNote=async (id,title,description,tag)=>{
    //api call
    const response=await fetch(`${host}api/notes/updatenote/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'auth_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhMDFmNWFmMDdjMzNiNDYxOTI1MjMyIn0sImlhdCI6MTY4ODIxNTUyMn0.-vCx6CF-Ev2NRUCoJY2JO0e9kE-KfzJnEfqGRKTa3sA'
      },
      body:JSON.stringify({title,description,tag})
    });
    let newnotes=JSON.parse(JSON.stringify(notes))
    for(let index=0;index<newnotes.length;index++){
      const element=newnotes[index];
      if(element._id===id){
        element.title=title;
        element.description=description;
        element.tag=tag;
        break;
      }
    }
    setNotes(newnotes)
  }

  //delete a note
  const deleteNote=async (id)=>{
   //api 
   const response=await fetch(`${host}api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
      'auth_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhMDFmNWFmMDdjMzNiNDYxOTI1MjMyIn0sImlhdCI6MTY4ODIxNTUyMn0.-vCx6CF-Ev2NRUCoJY2JO0e9kE-KfzJnEfqGRKTa3sA'
    }
  });

  const json=await response.json()
    // console.log(response.json())
    console.log("id ",id)
    const newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }
    return (
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;