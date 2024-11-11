import { useState } from "react";
import "./styles/styles.css";
import { useEffect } from "react";
export function App() {
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  const handleTitle = (event) => {
    setInput(event.target.value);
  };

  const handleContent = async(event) => {
    setContent(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault()
    if (input && content) {
      const newNote = {
        title: input,
        content: content,
      };
      try {
        const response = await fetch('http://localhost:3001/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNote),
        })
        const savedNote = await response.json()
        setNotes((beforeNote) => [...beforeNote, savedNote])
          setInput('');
          setContent('');
      } catch (error) {
        console.error('Error en: ', error.message);
      }
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNotes();
  }, []);

  const onDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/notes/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        console.log('Error al eliminar la nota');
        return;
      }
  
      // Siermpre debo de actualizar el estado eliminando la nota de el
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <>
      <h1>Crud</h1>

      <form onSubmit={onSubmit}>
        <p>Title: </p>
        <input type="text" onChange={handleTitle} value={input} />
        <p>Content: </p>
        <input type="text" onChange={handleContent} value={content} />
        <button>Send</button>
      </form>

      <h2>Notes</h2>
      <ul className="flex bg-black">
        {notes.map((note) => (
          <li key={note._id} className="list-style">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button>Editar</button>
            <button onClick={() => onDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
