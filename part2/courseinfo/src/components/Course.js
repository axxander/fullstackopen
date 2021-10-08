const Header = ({ text }) => {
    return (
        <h1>{text}</h1>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </div>
    );
};

const Part = ({ name, exercises }) => {
    return (
        <p>{name} {exercises}</p>
    );
};

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p><b>total of {total} exercises</b></p>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;