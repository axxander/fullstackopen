const Person = ({ person, onClickDelete }) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={onClickDelete}>delete</button>
        </div>
    );
};

const Persons = ({ persons, deletePersonHandler }) => {
    return (
        <div>
            {persons.map(person => <Person key={person.id} person={person} onClickDelete={() => { deletePersonHandler(person.id); }} />)}
        </div>
    );
};

export default Persons;