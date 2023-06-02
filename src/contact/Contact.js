
function Contact({ chat, selectedContact, setSelectedContact }) {
    return (
        <li key={chat.id}
            className={`list-group-item contact container ${selectedContact && selectedContact.user.username === chat.user.username ? 'active' : ''}`}
            onClick={() => setSelectedContact(chat)}>
            <div className="row">
                <div className="col-2">
                    <img className="rounded-circle" src={chat.user.profilePic} />
                </div>
                <div className="col-10">
                    <b className="text-white w-100">{chat.user.displayName}</b>
                    <span className="badge date">{chat.lastMessage ? chat.lastMessage.created : ''}</span>
                    <br />
                    <span className="text-opacity-50 text-white lastMessage">
                        {chat.lastMessage ? chat.lastMessage.content : ''}
                    </span>
                </div>
            </div>
        </li>


    );
}

export default Contact;