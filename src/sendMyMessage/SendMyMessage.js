import { useEffect, useRef } from "react";

function SendMyMessage({ sendMessage, contact }) {
    const typeBar = useRef(null);
    const send = function (e) {
        e.preventDefault(); // Prevent the default form submission
        if (typeBar.current.value.trim() !== '') {
            sendMessage(typeBar.current.value);
            typeBar.current.value = ''; // Clear the input field after sending the message
        }
    };

    useEffect(() => {
        typeBar.current.value = '';
    }, [contact])

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