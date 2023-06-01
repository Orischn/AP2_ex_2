import { useRef } from "react";

function SendMyMessage({ token, contact, setLatestMessage }) {

    const typeBar = useRef(null);

    const send = async function(e) {

        e.preventDefault(); // Prevent the default form submission
        if (typeBar.current.value.trim() === '') {
            return;
        }
        const message = typeBar.current.value.trim();
        const res = await fetch(`http://localhost:5000/api/Chats/${contact.id}/Messages`, {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            'body': JSON.stringify({
                "msg": message,
            })

        })
        setLatestMessage(message);
        typeBar.current.value = '';
    }
    
    // useEffect(() => {
    //     typeBar.current.value = '';
    // }, [contact])

    return (
        <div className="d-flex">
            <span id="messageBar" className="input-group">
                <form onSubmit={send} className="input-group">
                    <input ref={typeBar} className="form-control inputText" placeholder="Type a message" />
                    <button id="sendButton" type="submit" className="btn">
                        <i className="bi bi-send" />
                    </button>
                </form>
            </span>
        </div>
    );
}

export default SendMyMessage;