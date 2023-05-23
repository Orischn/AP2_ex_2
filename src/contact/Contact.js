import Clock from "../clock/Clock";

function Contact({ username, dName, profilePic, messages, selectedContact, setSelectedContact }) {
    return (
        <li key={username}
            className={`list-group-item contact container ${selectedContact && selectedContact.username === username ? 'active' : ''}`}
            onClick={() => setSelectedContact({ username, dName, profilePic, messages })}>
            <div className="row">
                <div className="col-2">
                    <img className="rounded-circle" src={profilePic} />
                </div>
                <div className="col-10">
                    <b className="text-white w-100">{dName}</b>
                    <span className="badge date"><Clock messages={messages}/></span>
                    <br />
                    <span className="text-opacity-50 text-white lastMessage">
                        {messages[messages.length - 1]}
                    </span>
                </div>
            </div>
        </li>


    );
}

export default Contact;