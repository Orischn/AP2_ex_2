function OtherMessage({message}) {
    return (
        <div dir="ltr">
            <div className="otherMessage">
                {message.content}
                <br />
                <span id="textTime" className="badge text-opacity-50">{message.created}</span>
            </div>
        </div>
    );
}

export default OtherMessage;