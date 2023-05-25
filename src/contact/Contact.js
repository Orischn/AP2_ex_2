import Clock from "../clock/Clock";

function Contact({ user, selectedContact, setSelectedContact }) {
    return (
        <li key={user.id}
            className={`list-group-item contact container ${selectedContact && selectedContact.username === username ? 'active' : ''}`}
            onClick={() => setSelectedContact(user)}>
            <div className="row">
                <div className="col-2">
                    <img className="rounded-circle" src={user.user.profilePic} />
                </div>
                <div className="col-10">
                    <b className="text-white w-100">{user.user.displayName}</b>
                    <span className="badge date">{user.lastMessage ? user.lastMessage.created : ''}</span>
                    <br />
                    <span className="text-opacity-50 text-white lastMessage">
                        {user.lastMessage ? user.lastMessage.content : ''}
                    </span>
                </div>
            </div>
        </li>


    );
}

export default Contact;