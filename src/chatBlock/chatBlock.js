import { useEffect, useRef } from "react";
import SendMyMessage from "../sendMyMessage/SendMyMessage";
import SendResult from "../sendResult/SendResult";

function ChatBlock({ contact, logout, token, me, latestMessage, setLatestMessage }) {
    const chat = useRef(null);
    useEffect(() => {
        chat.current.scrollTop = chat.current.scrollHeight;
        setLatestMessage(null);
    }, [contact, latestMessage])
    return (
        <>
            <div id="me" className="d-flex align-items-center w-100">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center">
                        <img className="ms-3 rounded-circle" src={contact.user.profilePic} />
                        <b className="ms-2 text-white-50">{contact.user.displayName}</b>
                    </div>
                    <button className="btn btn-danger" onClick={logout}>logout</button>
                </div>
            </div>
            <div ref={chat} id="chat" className="w-100">
                <SendResult token={token} contact={contact} me={me} latestMessage={latestMessage} setLatestMessage={setLatestMessage} />
            </div>
            <SendMyMessage setLatestMessage={setLatestMessage} token={token} contact={contact} />

        </>
    );
}

export default ChatBlock;
