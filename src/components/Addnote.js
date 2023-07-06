import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

export default function Addnote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: " ", description: "", tag: " " });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: " ", description: "", tag: "" });
    props.showAlert("added successfully", "success");
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container col-md-8 my-3">
      <h1 className="text-center">Add a Note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={note.title}
            name="title"
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={note.description}
            name="description"
            onChange={onchange}
            minLength={10}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={note.tag}
            name="tag"
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="row col-md-2 mx-auto">
          <button
            disabled={note.title.length < 5 || note.description.length < 10}
            type="submit"
            className="btn btn-primary p-2 "
            onClick={handleClick}
          >
            Add note
          </button>
        </div>
      </form>
    </div>
  );
}
