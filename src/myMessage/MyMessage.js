import Clock from "../clock/Clock";

function MyMessage({message}) {
    return (
        <div dir="rtl">
            <div className="myMessage">
                {message.content}
                <br />
                <span id="textTime" className="badge text-opacity-50">{message.created}</span>
            </div>
        </div>
    );
}

export default MyMessage;