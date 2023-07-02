import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState=(props)=>{
 const s1={
    "name":"sunny",
    "temp":"ji"
 }
 const [states,setStates]=useState(s1);
 const update=()=>{
    setTimeout(() => {
        setStates({
            "name":"tomar",
            "temp":"hi"
        })
    }, 1000);
 }
    return (
        <NoteContext.Provider value={{states,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;