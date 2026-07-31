import './App.css'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { use } from 'react'


function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setcurrentNote] = useState({ title: "", desc: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {

    let localNotes = localStorage.getItem("notes");
    if (localNotes) {
      setNotes(JSON.parse(localNotes));
    }
  }, []);

  const handleChange = (e) => {
    setcurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  }

  const onEdit = (id) => {
    const note = notes.find((n) => n.id === id);

    setcurrentNote({ title: note.title, desc: note.desc });
    setEditId(id);
  }

  const deleteNote = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    setNotes(notes.filter(item => item.id != id));
    localStorage.setItem("notes", JSON.stringify(notes.filter(item => item.id != id)));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updateNotes = notes.map((note) =>
        note.id === editId
          ? {
            ...note,
            title: currentNote.title,
            desc: currentNote.desc,
          }
          : note
      );

      setNotes(updateNotes);
      localStorage.setItem("notes", JSON.stringify(updateNotes));
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: currentNote.title,
        desc: currentNote.desc,
      };

      const updateNotes = [...notes, newNote];

      setNotes(updateNotes);
      localStorage.setItem("notes", JSON.stringify(updateNotes));
    }

    setcurrentNote({
      title: "",
      desc: "",
    });


  }
  return (
    <>
      <Navbar />
      <main>
        <h1> Create your note</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input type='text' name='title' onChange={handleChange} id="title" value={currentNote.title}></input>
          </div>
          <div>
            <label>Description</label>
            <textarea name='desc' id='desc' onChange={handleChange} value={currentNote.desc}>
            </textarea>
          </div>
          <button>{editId ? "Update Note" : "Add Note"}</button>
        </form>
      </main>
      <section className='noteSection'>
        <h2>Your Notes</h2>
        <div className='container'>
          {notes && notes.map(note => {
            return <Card key={note.id} id={note.id} title={note.title} desc={note.desc} onEdit={onEdit} deleteNote={deleteNote} />
          })}
          {notes.length == 0 && <div>Add a note to continue</div>}
        </div>
      </section>
    </>
  )
}

export default App