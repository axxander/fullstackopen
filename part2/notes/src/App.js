import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Initialise notes from server
  useEffect(() => {
    console.log('effect');
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  // Adding a new note
  const addNote = (event) => {
    event.preventDefault(); // stop auto page reload
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService
      .create(noteObject)
      .then(note => {
        setNotes(notes.concat(note));
        setNewNote('');
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(
          `Sorry, something went wrong!`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  // Update new note state
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  // 
  const toggleImportanceOf = (id) => {
    // Get note by id
    const note = notes.find(n => n.id === id);
    // Toggle importance via negation
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        // update state depends on previous: so use callback function
        setNotes(currentNotes => {
          // only update note with given id
          return currentNotes.map(n => n.id === id ? returnedNote : n);
        });
      })
      .catch(err => {
        // display error message
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        // remove error message after 5 seconds
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        // delete note from DOM since already deleted on server
        setNotes(currentNotes => {
          return currentNotes.filter(note => note.id !== id);
        });
      });
  };

  // for filtering notes by importance
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
