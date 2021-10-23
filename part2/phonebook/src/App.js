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

        const newPersonObject = {
            name: newName,
            number: newNumber
        };

        const existingPerson = persons.find(person => person.name === newName);

        if (existingPerson !== undefined) {
            if (window.confirm(`${existingPerson.name} already exists. Would you like to replace them?`)) {
                // delete user
                personService
                    .del(existingPerson.id)
                    .then(() => {
                        console.log('deleted person from db');
                        setPersons(currentPersons => currentPersons.filter(person => person.id !== existingPerson.id));
                        // setPersons(persons.filter(person => person.id !== existingPerson.id)); // why is this not working?!
                        console.log('should have set state of persons array');
                    })
                    .catch(err => {
                        alert(`${err}`);
                    });
            } else {
                return;
            }
        }
        // create new user
        personService
            .create(newPersonObject)
            .then(returnedPerson => {
                setPersons(currentPersons => currentPersons.concat(returnedPerson));
                setNewName('');
                setNewNumber('');
                setNotification(`Added ${newName}`);
                setTimeout(() => {
                    setNotification('');
                }, 3000);
            })
            .catch(err => {
                console.log(err);
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