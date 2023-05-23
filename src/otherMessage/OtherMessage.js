function OtherMessage({message}) {
    return (
        <div dir="ltr">
            <div className="otherMessage">
                {message}
                <br />
                <span id="textTime" className="badge text-opacity-50"><Clock messages={[]}/></span>
            </div>
        </div>
    );
}

export default OtherMessage;