import React, { useState } from 'react';

const Number = ({ person }) => {
    return (
        <div>{person.name}</div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const addNewName = (event) => {
        event.preventDefault();

        // check if entry already exists
        if (persons.find(person => person.name === newName) !== undefined) {
            alert(`${newName} is already added to the phonebook`);
            return;
        }

        const personObject = {
            name: newName,
        };
        setPersons(persons.concat(personObject));
        setNewName('');
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNewName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <Number key={person.name} person={person} />)}
        </div>
    );
};

export default App;