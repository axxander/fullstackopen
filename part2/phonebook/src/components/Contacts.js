const Contact = ({ person }) => {
    return (
        <div>{person.name} {person.number}</div>
    );
};

const Contacts = ({ persons }) => {
    return (
        <div>
            {persons.map(person => <Contact key={person.id} person={person} />)}
        </div>
    );
};

export default Contacts;