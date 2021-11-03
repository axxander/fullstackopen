import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Notification from './components/Notification';
import NewPerson from './components/NewPerson';
import personService from './services/person';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notification, setNotification] = useState(null);

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

        // Create new person
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        personService
            .create(newPerson)
            .then(person => {
                setPersons(currentPersons => currentPersons.concat(person));
                setNewName('');
                setNewNumber('');
                setNotification(`Added ${person.name} to phonebook`);
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            })
            .catch(err => {
                const body = err.response.data;
                setNotification(`${body.error.msg}`);
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            });
    };

    // delete person
    const deletePerson = (id) => {
        personService
            .del(id)
            .then(response => {
                setPersons(currentPersons => currentPersons.filter(person => person.id !== id));
            })
            .catch(err => {
                setPersons(currentPersons => currentPersons.filter(person => person.id !== id));
                setNotification(`already deleted`);
                setTimeout(() => {
                    setNotification('');
                }, 3000);
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
            <Notification message={notification} />
            <Filter value={filter} onChange={handleFilterChange} />
            <NewPerson addNewPerson={addNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <Persons persons={filteredPersons} deletePersonHandler={deletePerson} />
        </div>
    );
};

export default App;