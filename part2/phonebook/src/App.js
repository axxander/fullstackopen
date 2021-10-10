import React, { useState } from 'react';
import Filter from './components/Filter';
import Contacts from './components/Contacts';
import NewContact from './components/NewContact';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const addNewPerson = (event) => {
        event.preventDefault();

        // check if entry already exists
        if (persons.find(person => person.name === newName) !== undefined) {
            alert(`${newName} is already added to the phonebook`);
            return;
        }

        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };
        setPersons(persons.concat(personObject));
        setNewName('');
        setNewNumber('');
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    // For handling filter by persons.name
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // For handling filter by person.name
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) === true);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} onChange={handleFilterChange} />
            <NewContact addNewPerson={addNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <Contacts persons={filteredPersons} />
        </div>
    );
};

export default App;