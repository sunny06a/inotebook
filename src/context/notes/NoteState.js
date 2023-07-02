import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState=(props)=>{
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
    },
    {
      "_id": "64a03017859363feb2445410",
      "user": "64a01f5af07c33b461925232",
      "title": "my title is ",
      "description": "hfsifgywgfifhiuhfwuifwf",
      "tag": "personal",
      "date": "2023-07-01T13:54:31.373Z",
      "__v": 0
    },
    {
      "_id": "64a03017859363feb2445412",
      "user": "64a01f5af07c33b461925232",
      "title": "my title is ",
      "description": "hfsifgywgfifhiuhfwuifwf",
      "tag": "personal",
      "date": "2023-07-01T13:54:31.761Z",
      "__v": 0
    }
  ]
  const [notes,setNotes]=useState(noteinital);
  //add a note
  const addNote=(title,description,tag)=>{
    const note={
        "_id": "64a03016859363feb244540c",
        "user": "64a01f5af07c33b461925232",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-07-01T13:54:30.716Z",
        "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //edit a note
  const editNote=()=>{

  }

  //delete a note
  const deleteNote=()=>{

  }
    return (
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;