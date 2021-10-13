import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Contacts from './components/Contacts';
import NewContact from './components/NewContact';
import personService from './services/person';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    // get notes from server
    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

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

        // create new person
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };

        // post new person to backend
        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setNewName('');
                setNewNumber('');
            })
            .catch(err => {
                console.log(err);
            });
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