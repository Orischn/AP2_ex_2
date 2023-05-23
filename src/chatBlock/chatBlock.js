import SendMyMessage from "../sendMyMessage/SendMyMessage";
import SendResult from "../sendResult/SendResult";

function ChatBlock({ contact, send, logout }) {
    return (
        <>
            <div id="me" className="d-flex align-items-center w-100">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center">
                        <img className="ms-3 rounded-circle" src={contact.profilePic} />
                        <b className="ms-2 text-white-50">{contact.dName}</b>
                    </div>
                    <button className="btn btn-danger" onClick={logout}>logout</button>
                </div>
            </div>
            <div id="chat" className="w-100">
                <SendResult messages={contact.messages} />
            </div>
            <SendMyMessage sendMessage={send} contact={contact} />

        </>
    );
}

export default ChatBlock;
