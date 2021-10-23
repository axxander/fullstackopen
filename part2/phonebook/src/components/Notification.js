const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    return (
        <div className={message ? "active" : null}>
            {message}
        </div>
    );
};

export default Notification;